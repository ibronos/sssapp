import {useState, useEffect, useRef} from 'react';
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
    const [roles, setRoles] = useState([]);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const email = useRef("");
    const name = useRef("");
    const password = useRef("");

    const loadData = async () => {

        try {
            await axios.get(`${import.meta.env.VITE_SERVER_HOST}/roles`)
            .then(
                response => {
                    console.log(response.data);
                    if(response.data.success){
                        setRoles(response.data.data);
                    }

                    console.log(roles);
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
                                    onChange={(e) => name.current = e.target.value}
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    required
                                />
                            </div>

                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Username"
                                    >
                                    Email
                                    </label>
                                    <input
                                    onChange={(e) => email.current = e.target.value}
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    required
                                />
                            </div>

                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Username"
                                    >
                                    Password
                                    </label>
                                    <input
                                    onChange={(e) => password.current = e.target.value}
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    required
                                />
                            </div>


                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="Username"
                                    >
                                    Role
                                </label>

                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        value={selectedOption}
                                        onChange={(e) => {
                                            setSelectedOption(e.target.value);
                                            // changeTextColor();
                                        }}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                            isOptionSelected ? 'text-black dark:text-white' : ''
                                        }`}
                                        >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Select your subject
                                        </option>
                                        {roles.map((item:any, index) => (
                                            <option key={index} value={item.slug} className="text-body dark:text-bodydark">
                                                {item.name}
                                            </option>
                                        ))}
                                    
                                    </select>

                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                    <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill=""
                                        ></path>
                                        </g>
                                    </svg>
                                    </span>
                                </div>

                                
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