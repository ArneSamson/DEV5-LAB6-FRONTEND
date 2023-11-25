<script setup>
    import {ref, onMounted} from 'vue';

    const teams = ref([
        {name: 'Gambit', score: 0},
        {name: 'Östersund', score: 0},
        {name: 'Bambino', score: 0},
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
                  case 3:
                      teams.value[2].score = data.score;
                      break;
                  default:
                      console.log("invalid team");
              }
            }


        };

        //fetch scores from API https://dev5-lab4.onrender.com/api/v1/score
        try{
            fetch('https://dev5-lab4.onrender.com/api/v1/score')
            .then(response => response.json())
            .then(data => {
                console.log(data.data[0].scores);
                teams.value[0].score = data.data[0].scores[0].score;
                teams.value[1].score = data.data[0].scores[1].score;
                teams.value[2].score = data.data[0].scores[2].score;
            });
        }catch(error){
            console.log(error);
        }
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