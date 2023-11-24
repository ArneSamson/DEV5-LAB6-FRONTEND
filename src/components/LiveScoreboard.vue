<script>
    import {ref, onMounted} from 'vue';

    let score = ref(0);
    let team = ref('home');

    let socket = null;

    onMounted(() => {
        socket = new WebSocket('ws://localhost:3000');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            score.value = data.score;
            team.value = data.team;

            console.log(data);
        };
    });
</script>

<template>
  <div>
    
  </div>

</template>

<style scoped>
</style>