import { Migration } from '@mikro-orm/migrations';

export class Migration20220128150524 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');
  }

}
