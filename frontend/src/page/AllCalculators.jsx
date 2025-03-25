import React, { useEffect, useState } from 'react';
import MortgageRecent from '../components/MortgageRecent';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AllCalculators = () => {
    const backendLink = useSelector((state) => state.prod.link);
    const [Data, setData] = useState([]); // Инициализация пустым массивом

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${backendLink}/api/v1/fetchAllCalculator`, {
                    withCredentials: true,
                });
                setData(res.data.calculators);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
        fetch();
    }, [backendLink]);

    return (
        <>
            {Data && (
                <MortgageRecent data={Data} />
            )}
        </>
    );
};

export default AllCalculators;