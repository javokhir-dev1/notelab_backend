import { Column, Model, Table, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Notebook } from 'src/notebooks/models/notebook.model';
import { User } from 'src/users/models/user.model';

interface NoteCreationAttr {
    user_id: number;
    notebook_id: number;
    content: string;
    type: string
    is_pinned: boolean
    is_favorite: boolean
}

@Table({ tableName: 'notes' })
export class Note extends Model<Note, NoteCreationAttr> {
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

    @ForeignKey(() => Notebook)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare notebook_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare content: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "text"
    })
    declare type: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare is_pinned: boolean

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare is_favorite: boolean

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Notebook)
    declare notebook: Notebook;
}
