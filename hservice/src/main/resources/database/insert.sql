INSERT INTO role(role_name)
VALUES ('ADMIN'),
       ('MANAGER'),
       ('DEVELOPER'),
       ('TESTER');

INSERT INTO priority(priority_name)
VALUES ('Высший'),
       ('Средний'),
       ('Низкий'),
       ('Низший');

INSERT INTO status(status_name)
VALUES ('В ожидании'),
       ('Выбрано для разработки'),
       ('В работе'),
       ('Готово для тестирования'),
       ('Тестируется'),
       ('Готово'),
       ('Закрыта');

INSERT INTO type(type_name)
VALUES ('Разработка спецификации'),
       ('Проектирование'),
       ('Разработка'),
       ('Тестирование'),
       ('Поиск ошибок'),
       ('Рефакторинг'),
       ('Развертывание');
