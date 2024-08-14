CREATE TABLE `coming-soon` (
	`id` text NOT NULL,
	`release-date` integer,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `release` (
	`id` text NOT NULL,
	`release-date` integer,
	`url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coming-soon_id_unique` ON `coming-soon` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `release-date-index` ON `coming-soon` (`release-date`);--> statement-breakpoint
CREATE UNIQUE INDEX `id-idx` ON `coming-soon` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `release_id_unique` ON `release` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `release_release-date_unique` ON `release` (`release-date`);--> statement-breakpoint
CREATE UNIQUE INDEX `release-date-index` ON `release` (`release-date`);