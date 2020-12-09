export enum TaskStatusesEnum {
  AWAITING,
  SELECT_FOR_DEVELOPMENT,
  IN_DEVELOPMENT,
  READY_FOR_TESTING,
  IN_TESTING,
  READY,
  CLOSED
}

export function getStatusNameByTaskStatusEnum(status: TaskStatusesEnum) {
  switch (status) {
    case TaskStatusesEnum.AWAITING:
      return 'В ожидании';
    case TaskStatusesEnum.SELECT_FOR_DEVELOPMENT:
      return 'Выбрано для разработки';
    case TaskStatusesEnum.IN_DEVELOPMENT:
      return 'В работе';
    case TaskStatusesEnum.READY_FOR_TESTING:
      return 'Готово для тестирования';
    case TaskStatusesEnum.IN_TESTING:
      return 'Тестируется';
    case TaskStatusesEnum.READY:
      return 'Готово';
    case TaskStatusesEnum.CLOSED:
      return 'Закрыта';
    default:
      return '';
  }
}
