INSERT INTO meals (name, description, photo_url, price, cooking_time)
VALUES ('Lanzhou beef noodle soup','Consisting of a flavorful, clear broth, shaved beef, tender Chinese radish slices, lots of cilantro and scallion, deep red chili oil, and chewy handmade noodles', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/01.png?raw=true', 15, 12),
('Qishan sour noodle soup', 'Qishan Noodles with Minced Pork (Saozi Noodles), is a traditional wheaten food in the Northwest part of China.', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/02.png?raw=true', 15, 10),
('Liangpi', 'noodle-like Chinese dish made from wheat or rice flour.', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/03.png?raw=true', 7, 10),
('Lamb soup', 'lamb soup recipe that produces a warm broth with rice, leek and mushrooms.', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/04.png?raw=true', 10, 8),
('rougamo', 'Chinese hamburger.', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/05.png?raw=true', 6, 8),
('Xinjiang big plate chicken', 'mixed hot chili peppers with chicken and potatoes in an attempt to reproduce a Sichuan taste', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/06.png?raw=true', 20, 18),
('Lamb shashlik', 'a dish of skewered and grilled cubes of lamb', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/07.png?raw=true', 1, 8),
('Lamb paomo', 'hot stew of chopped-up steamed leavened flat bread, cooked in lamb broth and served with lamb meat', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/08.png?raw=true', 12, 15),
('Cumin roast rib', 'chinese style barbecue with cumin', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/09.png?raw=true', 18, 15),
('hand grab rice', ' traditional food in west Yunnanm, consist of pork and rice', 'https://github.com/warlocksa/LHL_food/blob/day1/doc/menu%20photo/10.png?raw=true', 8, 12);

INSERT INTO customers (first_name, last_name, phone, email, password)
VALUES ('Sven', 'Dota', '123456789', 'example1@gmail.com', '123123'),
('Shaco', 'Lol', '987654321', 'example2@gmail.com', '123123');

INSERT INTO orders (user_id)
VALUES (1),
(2),
(1);

INSERT INTO order_lineitems (order_id, meal_id,price, quantity)
VALUES (1, 2,15,1),
(1, 5,6,1);

INSERT INTO order_reviews (user_id, order_id, rating)
VALUES (1, 1, 4),
(2, 2, 4),
(1, 3, 5);
