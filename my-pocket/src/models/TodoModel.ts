interface TodoModel {
  id: number;
  value: {
    title: string;
    shortText: string;
    longText: string;
    targetTime: string;
  };
}

export default TodoModel;
