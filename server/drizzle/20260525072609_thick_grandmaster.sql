CREATE TABLE `awards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`reward` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer,
	`title` text NOT NULL,
	`description` text,
	`file` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `essays` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`label` text NOT NULL,
	`content` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `exams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`date` text,
	`location` text,
	`time` text,
	`url` text,
	`score` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `extra_curriculum` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`participation` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`date_of_birth` text,
	`citizenship` text
);

CREATE TABLE `profile_universities` (
	`profile_id` integer NOT NULL,
	`university_id` integer NOT NULL,
	PRIMARY KEY(`profile_id`, `university_id`),
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`university_id`) REFERENCES `universities`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `universities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`logo` text,
	`city` text,
	`state` text,
	`website` text,
	`qsrank` integer,
	`best_field` text,
	`control` text,
	`size` integer,
	`sex` text,
	`primary_focus` text,
	`religion` integer,
	`total_cost` real,
	`coa` text,
	`aid_international` text,
	`number_aid_int` integer,
	`percent_aid_int` real,
	`average_amount_aid` real,
	`cost_after_aid` real,
	`max_aid` real,
	`max_aid_name` text,
	`how_to_apply` text,
	`note` text,
	`acceptance_rate` real,
	`rd_acceptance` real,
	`rd_deadline` text,
	`ed_acceptance` real,
	`ed_deadline` text,
	`ea_acceptance` real,
	`ea_deadline` text,
	`percent_sat` real,
	`average_sat_score` real,
	`percent_act` real,
	`four_year_graduation_rate` real,
	`five_year_graduation_rate` real,
	`six_year_graduation_rate` real,
	`ea_ed_financial_aid_deadline` text,
	`ed2_application_deadline` text,
	`ed2_financial_aid_deadline` text,
	`rd_document_deadline` text,
	`rd_only_financial_aid_deadline` text
);
