<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Input from "@/components/utils/Input.vue";
import Textarea from "@/components/utils/Textarea.vue";
import Checkbox from "@/components/utils/Checkbox.vue";
import Button from "@/components/utils/Button.vue";
import type TodoModel from "@/models/TodoModel";
import {
  removeAll,
  removeOne,
  retrieveAll,
  store,
  update,
} from "@/services/store";
import History from "@/components/commons/History.vue";
import Feature from "@/constants/feature";

const defaultInputs = {
  title: "",
  shortText: "",
  longText: "",
  targetTime: "",
};
const editState = reactive<{ isOn: boolean; item: TodoModel | null }>({
  isOn: false,
  item: null,
});
const inputs = reactive({ ...defaultInputs });
const optionCheckboxes = reactive({
  title: true,
  shortText: true,
  longText: true,
});
const todos = ref<TodoModel[]>([]);

// Start - Life circle
onMounted(() => {
  const datas = retrieveAll(Feature.TODO);
  todos.value = datas;
});
// End - Life circle

// Start - utils
const getTodoObj = () => {
  const todo: TodoModel = {
    id: Date.now(),
    value: {
      title: inputs.title,
      shortText: inputs.shortText,
      longText: inputs.longText,
      targetTime: inputs.targetTime,
    },
  };

  return todo;
};

const clearInputs = () => {
  Object.assign(inputs, defaultInputs);
};

const add = () => {
  const todo = getTodoObj();
  todos.value = store(Feature.TODO, todo);

  clearInputs();
};

const edit = (item: TodoModel) => {
  editState.isOn = true;
  editState.item = item;
  window.scrollTo(0, 0);
  inputs.title = item.value.title;
  inputs.shortText = item.value.shortText;
  inputs.longText = item.value.longText;
  inputs.targetTime = item.value.targetTime;
};

const remove = (item: TodoModel) => {
  todos.value = removeOne(Feature.TODO, item.id);
};

const deleteAll = () => {
  todos.value = removeAll(Feature.TODO);
};

const confirmEdit = () => {
  if (editState.item) {
    todos.value = update(Feature.TODO, {
      ...getTodoObj(),
      id: editState.item.id,
    });
    editState.isOn = false;
    editState.item = null;
    clearInputs();
  }
};
// End - utils
</script>

<template>
  <div class="row p-0 m-0">
    <div class="col-sm-8 leftContainer">
      <div class="container">
        <div class="pb-2">
          <h3>Options</h3>
          {{ optionCheckboxes }}
          <div class="optionsContainer">
            <Checkbox
              id="title"
              label="Title"
              v-model:checked="optionCheckboxes.title"
            />
            <Checkbox
              id="shortText"
              label="Short Text"
              v-model:checked="optionCheckboxes.shortText"
            />
            <Checkbox
              id="longText"
              label="Long Text"
              v-model:checked="optionCheckboxes.longText"
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
          <Button text="ADD" :onClick="add" v-show="!editState.isOn" />
          <Button text="EDIT" :onClick="confirmEdit" v-show="editState.isOn" />
        </div>
      </div>
    </div>
    <div class="col-sm-4 rightContainer">
      <History
        :items="todos"
        :editCb="edit"
        :deleteCb="remove"
        :deleteAllCb="deleteAll"
      />
    </div>
  </div>
</template>

<style scoped></style>
