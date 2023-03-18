<template>
<div>

    <ul>
        <li>
            <router-link to="/addPoll" class="button">Add Poll</router-link>
        </li>
        <li>
            <router-link to="/pollList">Poll List</router-link>
        </li>
        <li>
            <router-link to="/showPoll">showPoll</router-link>
        </li>
    </ul>
    <router-view />
</div>
</template>

<script>
export default {
    name: 'HomeView',
}
</script>

<style scoped>
.button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 20px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
}

.button:hover {

    background-color: rgb(171, 69, 240);
    color: white
}

li {
    list-style-type: none;
    font-size: 20px;
}
</style>
