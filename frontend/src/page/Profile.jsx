import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
    const backendLink = useSelector((state) => state.prod.link);
    const [UserData, setUserData] = useState(null); // Инициализация как null

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${backendLink}/api/v1/getProfileData`, {
                    withCredentials: true,
                });
                setUserData(res.data.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных профиля:", error);
            }
        };
        fetch();
    }, [backendLink]);

    // Условный рендеринг, пока данные не загружены
    if (!UserData) {
        return <div>Загрузка данных профиля...</div>;
    }

    return (
        <div>
            <h1>Профиль</h1>
            <p>Имя пользователя: {UserData.username}</p>
            <p>Email: {UserData.email}</p>
        </div>
    );
};

export default Profile;