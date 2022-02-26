import dbInfo from "../../pages/api/db";

export default async function dbData() {
    const [dbI] = await dbInfo() 

    return (
        <div>
            {dbI}
        </div>
    )
}