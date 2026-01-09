import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Note } from 'src/notes/models/notes.model';
import { Settings } from 'src/settings/models/setting.model';
import { User } from 'src/users/models/user.model';

interface NotebookCreationAttr {
    user_id: number;
    title: string;
    is_favorite?: boolean;
}

@Table({ tableName: 'notebooks' })
export class Notebook extends Model<Notebook, NotebookCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare is_favorite: boolean;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => Note)
    declare notes: Note[];
}
