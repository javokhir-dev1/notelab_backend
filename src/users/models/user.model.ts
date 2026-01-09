import { Column, Model, Table, DataType, HasMany, AllowNull, HasOne } from 'sequelize-typescript';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { Note } from 'src/notes/models/notes.model';
import { Settings } from 'src/settings/models/setting.model';

interface UserCreationAttr {
    username: string,
    password: string,
    avatar_url?: string,
    bio?: string,
    refresh_token: string
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare username: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.STRING,
    })
    declare avatar_url: string

    @Column({
        type: DataType.STRING,
    })
    declare bio: string

    @Column({
        type: DataType.STRING
    })
    declare refresh_token: string

    @HasMany(() => Notebook)
    declare notebooks: Notebook[];

    @HasMany(() => Note)
    declare notes: Note[];

    @HasOne(() => Settings)
    declare setting: Settings;
}