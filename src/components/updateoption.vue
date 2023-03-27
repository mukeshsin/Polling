<template>
<div classs="formContainer">
    <div class="pollForm" v-if="option">
        <label class="pollLabels" :for="option">Update Option</label>
        <input type="text" class="pollInputs" v-model="option.optionTitle" />
        <span class="addError">{{ updateOptionError }} </span>

        <div>
            <button type="submit" class="pollBtn" @click="updateOption(option.optionList, id)">Update Options</button>
            <button type="submit" class="cancelBtn" @click="viewPolls">Cancel</button>
        </div>

    </div>
    </div>
</template>

<script>
export default {
    name: 'updateOption',
    setup() {

    }
}
</script>

<style scoped>

</style>
