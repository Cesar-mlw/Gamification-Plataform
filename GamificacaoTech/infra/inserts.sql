-- inserts table AREA
insert into area (nome_area, integrantes_area, cor_area) values("Business Intelligence", 0, "#1F0D2D");
insert into area (nome_area, integrantes_area, cor_area) values("Games", 0, "#1FCD2D");
insert into area (nome_area, integrantes_area, cor_area) values("Development", 0, "#1FCD8D");
insert into area (nome_area, integrantes_area, cor_area) values("Inovação Tecnológica", 0, "#1FCDBD");
insert into area (nome_area, integrantes_area, cor_area) values("misc", 0, "PALETA DE TECH");

-- inserts table ACHIEVEMENTS
insert into achievement (nome_achievement, criterio_achievement) values("ACHIEVEMENT TESTE", "DONE SOME WEIRD SHIT ON THE PLATFORM LIKE A BACKFLIP OR SOMETHING WHOLESOME");

-- inserts ITEM
insert into item (nome_item, top_item, bottom_item, left_item, right_item, img_url_item) values ("ITEM TESTE", 0, 0, 0, 0, "../images/PLACEHOLDER_PATH");

-- inserts TIPO DE INFORMACAO
insert into tipo_informacao (nome_tipo_informacao) values ("infoFaculdade");
insert into tipo_informacao (nome_tipo_informacao) values ("infoArea");
insert into tipo_informacao (nome_tipo_informacao) values ("infoMisc");

-- inserts TIPO PROJETO
insert into tipo_projeto (nome_tipo_projeto) values ("foraESPM");
insert into tipo_projeto (nome_tipo_projeto) values ("dentroESPM");
insert into tipo_projeto (nome_tipo_projeto) values ("estagio");
insert into tipo_projeto (nome_tipo_projeto) values ("aulaTECH");
insert into tipo_projeto (nome_tipo_projeto) values ("cursoOnline");

-- inserts INFORMACAO
insert into informacao (fk_id_tipo_informacao, nome_informacao, texto_informacao, local_informacao, fk_id_area) values (1, "Onde fica a Secretaria?", "A secretaria fica no predio da AA", "Unidade Alvaro Alvim", 3);

-- inserts CURSO
insert into curso (nome_curso) values("PUBLICIDADE");
insert into curso (nome_curso) values("DESIGN");
insert into curso (nome_curso) values("TECH");



select * from projeto;

select * from achievement;
select * from achievement_usuario;
select * from area;
select * from curso;
select * from informacao;
select * from tipo_informacao;
select * from item;
select * from item_usuario;
select * from projeto;
select * from tipo_projeto;
select * from usuario;
