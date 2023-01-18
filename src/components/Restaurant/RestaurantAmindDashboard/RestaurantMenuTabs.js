import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


function RestaurantMenuTabs({ restaurant, restaurantModif, restId}) {

    // let menu = restaurant.menu
    console.log(restaurant)
    const navigate = useNavigate()

    return (
        <Tabs>
            <TabList>
                {Object.keys(restaurant.menu).map((types) => {
                    console.log(types)
                    return (
                        <>
                        <Tab>{types}</Tab>
                      
                        </>

                    )
                })}
            </TabList>
            
                {Object.keys(restaurant.menu).map((types) => {
                    return (
                        <TabPanel>
                            {Object.keys(restaurant.menu[types]).map((food) => {
                                return (
                                    
                                    <ul className="tablist" key={restaurant.menu[types][food].uuid}>
                                        <li>{food}: </li>
                                        <li>{restaurant.menu[types][food].price}</li>
                                        {restaurantModif &&
                                            <button className='restaurant-new-food-btn' onClick={() => navigate(
                                                `/restaurants/menu-item/modification/${restId}/${restaurant.menu[types][food].uuid}`
                                              )}>Modify</button>
                                        }
                                    </ul>
                                );
                            })}
                        </TabPanel>
                    );
                })}
        </Tabs>
    )
}

export default RestaurantMenuTabs