<template>
<div class="hello">
    <h3 class="head1">{{ msg }}</h3>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.head1 {
    font-size:25px;
    font-family:'Times New Roman', Times, serif
}
</style>
