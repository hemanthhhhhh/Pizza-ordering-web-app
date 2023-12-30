"use client"
import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function MenuItemsPage() {

    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])

    if(loading) {
        return 'Loading user info...'
    }

    if(!data.admin) {
        return "Not an admin."
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link className="flex button" href={'/menu-items/new'}>
                    Create new menu item
                <Right/>
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit item name</h2>
                <div className="grid grid-cols-3 gap-2">
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link key={item._id} href = {'/menu-items/edit/'+item._id} className="mb-1 button flex-col text-center bg-gray-200 rounded-lg p-4">
                        <div className="relative">
                        </div>
                        <div className="text-center">
                            {item.name}
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </section>
    )
}