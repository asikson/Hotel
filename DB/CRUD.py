def insertQuery(cursor, conn, tableName, argument, value):
    inQuery = ' INSERT INTO {tableName} ({argument}) VALUES ({value})'.format(tableName=tableName, argument=argument,
                                                                              value=value)
    cursor.execute(inQuery)
    conn.commit()
    print("Dodano rekord")


def viewTable(cursor, tableName):
    cursor.execute("SELECT * from {tableName}".format(tableName=tableName))
    record = cursor.fetchall()
    print("Tabela ", record)


def updateQuery(cursor, conn, tableName, column, value, condition, conValue):
    updateQuery = "Update {tableName} set {column} = {value} where {condition} = {conValue}".format(tableName=tableName,
                                                                                                    column=column,
                                                                                                    value=value,
                                                                                                    condition=condition,
                                                                                                    conValue=conValue)
    cursor.execute(updateQuery)
    conn.commit()
    count = cursor.rowcount
    print(count, "Rekord zaktualizowany")


def deleteQuery(cursor, conn, tableName, condition, conValue):
    deleteQuery = "Delete from {tableName} where {condition} = {conValue}".format(tableName=tableName,
                                                                                  condition=condition,
                                                                                  conValue=conValue)
    cursor.execute(deleteQuery)
    conn.commit()
    count = cursor.rowcount
    print(count, "Usunieto rekord ")


