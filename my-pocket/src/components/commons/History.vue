<script setup lang="ts">
import type TodoModel from "@/models/TodoModel";
import { reactive } from "vue";
import Checkbox from "@/components/utils/Checkbox.vue";

interface Props {
  items: TodoModel[];

  editCb: (item: TodoModel) => void;
  deleteCb: (item: TodoModel) => void;
  deleteAllCb: () => void;
}

const optionCheckboxes = reactive({
  previous: false,
  today: false,
  coming: false,
});

const { items, editCb, deleteCb, deleteAllCb } = defineProps<Props>();

// Start - utils
const onHoverHistoryCard = (id: number) => {
  const editableContainers: any =
    document.getElementsByClassName("editableContainer");
  for (let i = 0; i < editableContainers.length; i++) {
    editableContainers[i].style.display = "none";
  }
  const editableContainer = document.getElementById(`editable_${id}`);
  if (editableContainer) {
    editableContainer.style.display = "flex";
  }
};

const edit = (item: TodoModel) => {
  editCb(item);
};

const remove = (item: TodoModel) => {
  deleteCb(item);
};

const removeAll = () => {
  deleteAllCb();
};
// End - utils
</script>

<template>
  <div class="mb-2">
    <h3>History Filter</h3>
    <div class="optionsContainer">
      <Checkbox
        id="previous"
        label="Previous"
        :checked="optionCheckboxes.previous"
      />
      <Checkbox id="today" label="Today" :checked="optionCheckboxes.today" />
      <Checkbox id="coming" label="Coming" :checked="optionCheckboxes.coming" />
    </div>
  </div>
  <div class="mb-2">
    <div class="historyContainer">
      <div class="action" @click="removeAll()" v-show="items.length > 0">
        Clear All
      </div>
      <div class="historyCardContainer" :key="item.id" v-for="item in items">
        <div class="editableContainer" :id="`editable_${item.id}`">
          <u @click="edit(item)">Edit</u><u @click="remove(item)">Delete</u>
        </div>
        <div class="historyCard" @mouseover="onHoverHistoryCard(item.id)">
          <div>{{ item.value.title }}</div>
          <div class="historyStatus">P</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.historyContainer {
  min-height: 70vh;
  max-height: 100vh;
  overflow: auto;
  padding: 20px;
}

.historyCardContainer {
  margin: 20px 0;
}

.historyCard {
  border: solid var(--borderWidth);
  border-radius: var(--borderRadius);
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px var(--dark);
  cursor: pointer;
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

.editableContainer {
  display: none;
  justify-content: flex-end;
}

.editableContainer u {
  margin-left: 20px;
  cursor: pointer;
}

.action {
  text-decoration: underline;
  text-align: end;
  cursor: pointer;
}
</style>
