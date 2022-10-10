<script setup lang="ts">
import { reactive } from "vue";
import Checkbox from "../utils/Checkbox.vue";

interface Props {
  items: any;
}

const optionCheckboxes = reactive({
  previous: false,
  today: false,
  coming: false,
});

withDefaults(defineProps<Props>(), { items: [] });

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
      <div class="historyCardContainer" :key="item.id" v-for="item in items">
        <div class="editableContainer" :id="`editable_${item.id}`">
          <u>Edit</u><u>Delete</u>
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
</style>
