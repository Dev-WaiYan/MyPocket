<script setup lang="ts">
import { reactive, ref, type Ref } from "vue";
import Input from "../components/utils/Input.vue";
import Textarea from "../components/utils/Textarea.vue";
import Checkbox from "../components/utils/Checkbox.vue";
import Button from "../components/utils/Button.vue";
import type TodoModel from "@/models/TodoModel";

const inputs = reactive({
  title: "",
  shortText: "",
  longText: "",
  targetTime: "",
});

const optionCheckboxes = reactive({
  title: false,
  shortText: false,
  longText: false,
});

const todos = ref<TodoModel[]>([]);

const add = () => {
  todos.value.push({
    id: Date.now(),
    value: {
      title: inputs.title,
      shortText: inputs.shortText,
      longText: inputs.longText,
      targetTime: inputs.targetTime,
    },
  });
  console.log("added");
};
</script>

<template>
  <div class="row p-0 m-0">
    <div class="col-sm-8 leftContainer">
      <div class="container">
        <div class="pb-2">
          <h3>Options</h3>
          <div class="optionsContainer">
            <Checkbox
              id="title"
              label="Title"
              :checked="optionCheckboxes.title"
            />
            <Checkbox
              id="shortText"
              label="Short Text"
              :checked="optionCheckboxes.shortText"
            />
            <Checkbox
              id="longText"
              label="Long Text"
              :checked="optionCheckboxes.longText"
            />
          </div>
        </div>

        <div class="formContainer">
          <div class="row">
            <div class="col-12 formGroup">
              <Input v-model:value="inputs.title" placeholder="Title" />
            </div>

            <div class="col-12 formGroup">
              <Input
                v-model:value="inputs.shortText"
                placeholder="Short Text"
              />
            </div>

            <div class="col-12 formGroup">
              <Textarea :value="inputs.longText" placeholder="Long Text" />
            </div>

            <div class="col-12 formGroup">
              <Input
                type="datetime-local"
                v-model:value="inputs.targetTime"
                placeholder="Choose Date"
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end my-3">
          <Button text="ADD" :onClick="add" />
        </div>
      </div>
    </div>
    <div class="col-sm-4 rightContainer">
      <div class="mb-2">
        <h3>History Filter</h3>
        <div class="optionsContainer">
          <Checkbox
            id="title"
            label="Title"
            :checked="optionCheckboxes.title"
          />
          <Checkbox
            id="shortText"
            label="Short Text"
            :checked="optionCheckboxes.shortText"
          />
          <Checkbox
            id="longText"
            label="Long Text"
            :checked="optionCheckboxes.longText"
          />
        </div>
      </div>
      <div class="mb-2">
        <div class="historyContainer">
          <div v-for="todo in todos" class="historyCard">
            <div>{{ todo.value.title }}</div>
            <div class="historyStatus">P</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formContainer,
.optionsContainer,
.historyContainer {
  background-color: var(--softWhite);
  border-radius: var(--borderRadius);
  padding: 0 10px;
}

.optionsContainer {
  display: flex;
  margin-bottom: 20px;
}

.historyContainer {
  min-height: 70vh;
  padding: 20px;
}

.historyCard {
  border: solid var(--borderWidth);
  border-radius: var(--borderRadius);
  padding: 5px 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px var(--dark);
}

.historyStatus {
  background-color: var(--danger);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  box-shadow: 1px 1px 2px var(--dark);
  font-weight: bold;
}

.formGroup {
  padding: 20px;
}

.leftContainer,
.rightContainer {
  padding: 20px 10px;
  border-right: var(--softWhite) solid var(--borderWidth);
}
</style>
