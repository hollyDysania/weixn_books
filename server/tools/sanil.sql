create table books(
  -- 数字(整数) 不允许为空 自动生成 主键
  id int not null auto_increment primary key,
  -- 字符串 长度20 不能为空 后面,号
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  image varchar(100),
  alt varchar(100) not null,
  publisher varchar(100) not null,
  summary varchar(1000) not null,
  price varchar(100),
  -- 数字(小数)
  rate float,
  tags varchar(100),
  author varchar(100)
)