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

-- inserts USUARIO
insert into usuario (ra_usuario, nome_usuario, semestre_usuario, email_usuario, dt_entrada_usuario, id_curso) values ("11122233", "Bernardo Favaretto", 8, "bfavaretto@acad.espm.br", "2019-11-02", 3);

-- inserts ITEM USUARIO
insert into item_usuario (fk_item_id, fk_usuario_id, dt_semestre_item) values (1, 11122233, 8); 

-- inserts ACHIEVEMENT USUARIO
insert into achievement_usuario (fk_achievement_id, fk_usuario_id, dt_semestre_achievement) values (1, 11122233, 8);

-- insert PROJETO
insert into projeto (fk_ra_usuario, fk_id_tipo_projeto, fk_id_area, nome_projeto, dt_inicio_projeto, dt_final_projeto, terminado_projeto, local_projeto, habilidade_projeto, descricao_projeto) values (11122233, 2, 2, "Gamificação TECH", "2019-02-01", "2019-06-14", 0, "ESPM TECH", "[{'nome':'JavaScript'}]", "Projeto para a gamificacao do curso de tech");

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
