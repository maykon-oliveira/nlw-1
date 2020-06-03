import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';
import Axios from 'axios';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface UF {
    id: number;
    sigla: string;
    nome: string;
    regiao: string;
}

interface City {
    id: number;
    nome: string;
}

const CreatePoint = ({ lat = 51.505, lng = -0.09, zoom = 13 }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<UF[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);
    const [initialMapPosition, setInitialMapPosition] = useState<[number, number]>([0, 0]);
    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
            setInitialMapPosition([latitude, longitude]),
        );
    }, []);

    useEffect(() => {
        api.get('http://localhost:8081/items')
            .then(({ data }) => data)
            .then(setItems);
    }, []);

    useEffect(() => {
        Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(({ data }) => data)
            .then(setUfs);
    }, []);

    useEffect(() => {
        if (selectedUF === '0') return;
        Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
            .then(({ data }) => data)
            .then(setCities);
    }, [selectedUF]);

    const handleUF = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectedUF(value);
    const handleCity = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => setSelectedCity(value);
    const handleInput = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [name]: value });
    const selectItem = (id: number) => {
        const has = selectedItems.findIndex((i) => i === id);
        if (has >= 0) {
            setSelectedItems(selectedItems.filter((i) => i !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleMapClick = ({ latlng: { lat, lng } }: LeafletMouseEvent) => setSelectedMapPosition([lat, lng]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const [lat, lng] = selectedMapPosition;

        const point = {
            ...form,
            uf: selectedUF,
            city: selectedCity,
            lat,
            lng,
            items: selectedItems,
        };

        api.post('/points', point).then(({ data }) => {
            alert('Ponto cadastrado');
            history.push('/');
        });
    };

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input value={form.name} onChange={handleInput} type="text" id="name" name="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input value={form.email} onChange={handleInput} type="email" id="email" name="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                value={form.whatsapp}
                                onChange={handleInput}
                                type="text"
                                id="whatsapp"
                                name="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialMapPosition} zoom={zoom} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedMapPosition}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select onChange={handleUF} value={selectedUF} id="uf" name="uf">
                                <option value="0">Selecione</option>
                                {ufs.map(({ id, sigla, nome }) => (
                                    <option key={id} value={sigla}>
                                        {nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select onChange={handleCity} value={selectedCity} id="city" name="city">
                                <option value="0">Selecione</option>
                                {cities.map(({ id, nome }) => (
                                    <option key={id} value={nome}>
                                        {nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Items de coleta</h2>
                        <span>Selecione um ou mais items abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(({ id, title, image_url }) => (
                            <li
                                key={id}
                                onClick={() => selectItem(id)}
                                className={selectedItems.includes(id) ? 'selected' : ''}
                            >
                                <img src={image_url} alt={title} />
                                <span>{title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">CADASTRAR PONTO DE COLETA</button>
            </form>
        </div>
    );
};

export default CreatePoint;
