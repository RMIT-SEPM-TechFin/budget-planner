import db from "@/firebase/db";
import { Category } from "@/types";
import { FieldValue, collection, documentId, getDocs, orderBy, query, where } from "firebase/firestore";

export default async function fetchItemData(projectId: string, userEmail: string) {

    const q = query(collection(db, 'projects'), where(documentId(), '==', projectId), where('members', 'array-contains', userEmail));

    const categories = await getDocs(q).then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const categories = data.map((item) => item.categories)[0];
        return categories;
    });
    
    console.log(categories);    
}