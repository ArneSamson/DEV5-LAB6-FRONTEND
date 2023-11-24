<script setup>
    import {ref, onMounted} from 'vue';

    const teams = ref([
        {name: 'Team 1', score: 0},
        {name: 'Team 2', score: 0},
    ]);

    let socket = null;

    onMounted(() => {
        socket = new WebSocket('ws://localhost:3000/primus');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log(data);
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