ALTER TABLE `users` ADD `orb_verified` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `device_verified` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `profile_url` text;