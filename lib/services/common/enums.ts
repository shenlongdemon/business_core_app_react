enum TaskStatus {
  not_start = 0,
  starting = 1,
  done = 2
}

enum ObjectType {
  unknown = 0,
  material = 1,
  product = 2,
  user = 3,
  bluetooth = 4
}

export { TaskStatus, ObjectType };
