import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/authReducer';
import "./Navbar.css"

const Navbar = () => {
    const links = [
        {
            name: "Главная",
            to: "/",
        },
        {
            name: "Все категории",
            to: "/all-calculators",
        },
        {
            name: "Профиль",
            to: "/profile",
        },
        {
            name: "Войти",
            to: "/login",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const backendLink = useSelector((state) => state.prod.link);
    const history = useNavigate();
    const dispatch = useDispatch();

    // Удаляем ссылку на профиль, если пользователь не авторизован
    if (!isLoggedIn) {
        links.splice(2, 1); // Удаляем "Профиль"
    } else {
        links.splice(3, 1); // Удаляем "Войти"
    }

    const logoutHandler = async () => {
        await axios.post(`${backendLink}/api/v1/logout`, {}, {
            withCredentials: true
        });
        dispatch(authActions.logout());
        history("/");
    };

    return (
        <div>
            <div className="Navigate">
                <nav>
                {links.map((items, i) => (
                    <Link className="nav-link" key={i} to={items.to}>
                        {items.name}
                    </Link>
                ))}

                {/* Кнопка "Регистрация" отображается только если пользователь не авторизован */}
                {!isLoggedIn && (
                    <Link className="nav-link" to="signup">
                        Регистрация
                    </Link>
                )}

                {/* Кнопка "Выйти" отображается только если пользователь авторизован */}
                {isLoggedIn && (
                    <button onClick={logoutHandler}>
                        Выйти
                    </button>
                )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;