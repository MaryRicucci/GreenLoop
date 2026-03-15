create database GreenLoop;

create table GreenLoop.Utenti (
	id_Utente int primary key AUTO_INCREMENT ,
    nome varchar(100),
    cognome varchar(100),
    email varchar(255) unique,
    pw varchar(255),
    id_google varchar(255),
    punti int,
    data_registrazione timestamp
);

create table GreenLoop.Missioni (
	id_Missione int primary key AUTO_INCREMENT,
	titolo varchar(100) unique,
    descrizione text not null,
    punti int,
    image_required boolean,
    data_creazione timestamp
);

create table GreenLoop.Missioni_completate (
	id_Completato int primary key auto_increment,
    id_Utente int,
    foreign key (id_Utente) references Utenti(id_Utente) ON DELETE CASCADE,
    id_Missione int,
    foreign key (id_Missione) references Missioni(id_Missione),
    foto varchar(255),
    stato enum ('pending','approved','rejected'),
    data_invio timestamp,
    data_validazione timestamp
);

create table GreenLoop.Premi (
	id_Premio int primary key AUTO_INCREMENT,
    nome varchar(100),
    descrizione varchar(255),
    costo int not null,
    qta int not null
);

create table GreenLoop.Premi_Riscattati (
	id_Riscattato int primary key AUTO_INCREMENT,
    id_Utente int,
    foreign key (id_Utente) references Utenti(id_Utente),
    id_Premio int,
    foreign key (id_Premio) references Premi(id_Premio),
    data_riscatto timestamp
);

create table GreenLoop.Pagamenti (
	id_Pagamento int primary key AUTO_INCREMENT,
    id_Utente int,
    foreign key (id_Utente) references Utenti(id_Utente),
    provider enum ('paypal','satispay'),
    importo decimal,
    stato enum ('pending','success','failed'),
    id_transazione varchar(255),
    data_creazione timestamp
);

create table GreenLoop.Registro_attività (
	id_Log int primary key AUTO_INCREMENT,
    id_Utente int null,
    foreign key (id_Utente) references Utenti(id_Utente),
    azione varchar(255),
    dettagli text,
    data timestamp
);

create table GreenLoop.Aziende (
	id_Azienda int primary key AUTO_INCREMENT,
    nome varchar(100) not null,
    descrizione text,
    logo_url varchar(255),
    data timestamp
);
