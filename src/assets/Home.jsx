import React, { useState, useEffect } from 'react';  
import { BiAddToQueue, BiEdit, BiSort } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import AddProduct from './AddProduct';
import './ProductList.css';

const Home = () => {  
    const [addProduct, setAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [openMenu, setOpenMenu] = useState(null); 
    const [editProduct, setEditProduct] = useState(null);
    const [searchProduct, setSearchProduct] = useState('');

    const handleAddProduct = (newProduct) => {
        setProducts(prevProducts => 
            editProduct !== null 
                ? prevProducts.map((product, index) => 
                    index === editProduct ? newProduct : product
                  )
                : [...prevProducts, newProduct]
        );
        setEditProduct(null);
        setAddProduct(false);
    };

    const handleDelete = (index) => {
        setProducts(products.filter((_, i) => i !== index));
        setOpenMenu(null);
    };

    const handleEdit = (index) => {
        setEditProduct(index);
        setAddProduct(true);
        setOpenMenu(null);
    };

    const menuList = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".menu-button") && !event.target.closest(".dropdown-menu")) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const filteredData = products.filter(item =>
        item.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
        item.category.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (  
        <div className='home-container'>  
            <div className='home-left-side'>
                <h1>Products</h1> 
                <p>Manage your inventory, add new products, and update existing ones.</p>
            </div>

            <div className="home-actions">
                <div className="home-search-container">
                    <FaSearch />
                    <input   
                        type="text"   
                        placeholder="Search products..."   
                        className="home-search"
                        value={searchProduct}
                        onChange={e => setSearchProduct(e.target.value)}
                    />  
                </div>
                <button className='home-add-button' onClick={() => setAddProduct(true)}> 
                    <BiAddToQueue /> Add Product 
                </button>
            </div>
        
            <div>
                <h2>Product Inventory</h2>
                {filteredData.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <table className='products'>
                        <thead>
                            <tr>
                                <th> Name <BiSort/> </th>
                                <th> Category</th>
                                <th> Price ($) <BiSort/> </th>
                                <th> Stock <BiSort/> </th>
                                <th> Created</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.dateAdded}</td>
                                    <td>
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation();
                                                menuList(index);
                                            }} 
                                            className="menu-button"
                                        >
                                            ⋮
                                        </button>

                                        {openMenu === index && (
                                            <ul className="dropdown-menu">
                                                <p>Actions</p>
                                                <li onClick={() => handleEdit(index)}> <BiEdit/> Edit</li>
                                                <li onClick={() => handleDelete(index)}> <RiDeleteBin2Fill/> Delete</li>
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {addProduct && (
                <AddProduct 
                    setAddProduct={setAddProduct} 
                    handleAddProduct={handleAddProduct} 
                    editProduct={editProduct !== null ? products[editProduct] : null}
                />
            )}
        </div>  
    );  
};  

export default Home;
