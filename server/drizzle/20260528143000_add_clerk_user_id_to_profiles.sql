ALTER TABLE `profiles` ADD COLUMN `clerk_user_id` text;
CREATE UNIQUE INDEX `profiles_clerk_user_id_unique` ON `profiles` (`clerk_user_id`);
