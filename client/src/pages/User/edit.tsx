import React, {useState, useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';


type TypeParams = {
    pageId:number | string | null,
    pageName: string
}

const Edit = ({pageId, pageName} : TypeParams) => {

    const pgName = pageName;
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const loadData = async () => {

        try {
            await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users`)
            .then(
                response => {
                    console.log(response.data);
                    if(response.data.success){
                        setItems(response.data.data);
                    }
                }
            )
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
                setLoading(false);
            });
        } 
        catch (error: any) {
            console.error(error);
        }

    };

    useEffect(() => {
        loadData();        
    }, []);

    
    return (
        <>
            <Breadcrumb pageName={pgName} />
            
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-5">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            {pageId ? "Edit Data" : "Add Data"}
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Username"
                                    >
                                    Name
                                    </label>
                                    <input
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="devidjhon24"
                                    defaultValue="devidjhon24"
                                />
                            </div>

                

                            <div className="flex justify-end gap-4.5">
                                <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="submit"
                                >
                                Cancel
                                </button>
                                <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                >
                                Save
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
        
            </div>
        
        </>
    );
};

export default Edit;