<script setup>
    import {ref, onMounted} from 'vue';

    const teams = ref([
        {name: 'Team 1', score: 0},
        {name: 'Team 2', score: 0},
    ]);

    let socket = null;

    onMounted(() => {
        socket = new WebSocket('wss://labo6-back-arne.onrender.com/primus');

        socket.onmessage = (event) => {
  
            const data = JSON.parse(event.data);
            
            if(data.team){

              console.log(data);
              console.log(data.team);
              
              switch (data.team){
                  case 1:
                      teams.value[0].score = data.score;
                      break;
                  case 2:
                      teams.value[1].score = data.score;
                      break;
                  default:
                      console.log("invalid team");
              }
            }


        };
    });
</script>

<template>
    <div>
      <h1>Team Scores</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams">
            <td>{{ team.name }}</td>
            <td>{{ team.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

<style scoped>
</style>