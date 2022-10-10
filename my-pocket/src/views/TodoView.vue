<script setup lang="ts">
import { reactive, ref } from "vue";
import Input from "../components/utils/Input.vue";
import Textarea from "../components/utils/Textarea.vue";
import Checkbox from "../components/utils/Checkbox.vue";
import Button from "../components/utils/Button.vue";
import type TodoModel from "@/models/TodoModel";
import { store } from "@/services/store";
import History from "../components/commons/History.vue";

const defaultInputs = {
  title: "",
  shortText: "",
  longText: "",
  targetTime: "",
};

const inputs = reactive({ ...defaultInputs });
const optionCheckboxes = reactive({
  title: false,
  shortText: false,
  longText: false,
});
const todos = ref<TodoModel[]>([]);

const clearInputs = () => {
  Object.assign(inputs, defaultInputs);
};

const add = () => {
  const todo = {
    id: Date.now(),
    value: {
      title: inputs.title,
      shortText: inputs.shortText,
      longText: inputs.longText,
      targetTime: inputs.targetTime,
    },
  };
  store({
    key: "todo",
    value: todo,
  });
  todos.value.push(todo);
  clearInputs();

  console.log("added", todos.value);
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
              <Textarea
                v-model:value="inputs.longText"
                placeholder="Long Text"
              />
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
      <History :items="todos" />
    </div>
  </div>
</template>

<style scoped></style>
