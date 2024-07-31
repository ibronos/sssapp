import {useState, useEffect, SyntheticEvent, useContext} from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { UserContext } from '../../router/ProtectedRoute';

type TypeParams = {
    pageId:number | string | null,
    pageName: string
}

const Edit = ({pageId, pageName} : TypeParams) => {

    const pgName = pageName;
    const [loading, setLoading] = useState(true);
    const apiCollection = 'izin';
    const apiMethod = pageId ? 'patch' : 'post';
    const apiUrl = pageId ? `${import.meta.env.VITE_SERVER_HOST}/${apiCollection}/${pageId}` : `${import.meta.env.VITE_SERVER_HOST}/${apiCollection}`;
    const userContext  = useContext(UserContext);
    
    const [items, setItems] = useState([]);
    const [izinJenis, setIzinJenis] = useState([]);
    const [izinApprove, setIzinApprove] = useState([]);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [selectIzinJenis, setSelectIzinJenis] = useState("");
    const [selectIzinApprove, setSelectIzinApprove] = useState("");
    const [isCanceled, setIsCanceled] = useState(0);

    const [userIzinApprove, setUserIzinApprove] = useState("");

    const loadData = async () => {

        try {
            await axios.get(`${import.meta.env.VITE_SERVER_HOST}/izinjenis`)
            .then(
                response => {
                    if(response.data.success){
                        setIzinJenis(response.data.data);
                    }
                }
            )
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
                setLoading(false);
            });

            await axios.get(`${import.meta.env.VITE_SERVER_HOST}/izinapprove`)
            .then(
                response => {
                    if(response.data.success){
                        setIzinApprove(response.data.data);
                    }
                }
            )
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
                setLoading(false);
            });

            if(pageId){
                await axios.get(`${import.meta.env.VITE_SERVER_HOST}/izin/${pageId}`)
                .then(
                    response => {
                        // console.log(response.data);
                        if(response.data.success){
                            setName(response.data.data.name);
                            setDetail(response.data.data.detail);
                            setSelectIzinJenis(response.data.data.izin_jenis_id);
                            setIsCanceled(response.data.data.is_canceled);
                            setSelectIzinApprove(response.data.data.izin_approve_id);
                            setUserIzinApprove(response.data.data.izin_approve.name);
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
        } 
        catch (error: any) {
            console.error(error);
        }

    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        let data = {};
      
        data = {
            name: name,
            detail: detail,
            izin_jenis: selectIzinJenis,
            izin_approve: selectIzinApprove,
            is_canceled: isCanceled
        };
        
        try {
            await axios(
                {
                    method: apiMethod,
                    url: apiUrl,
                    data: data
                }
            )
            .then(() => {
                alert('data updated!');
            })
            .catch((error) => {
                throw new Error(error)
            })
            .finally(() => {
                setLoading(false);
            });
        } 
        catch (error: any) {
            console.error(error.response.data);
        }
    
    };

    const handleCancel = () => {
        window.location.reload(); 
    }

    useEffect(() => {
        loadData();        
    }, []);

    const renderCancel = () => {
        if( pageId ){
            return (
                <>
                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            >
                            Cancel
                        </label>
    
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                            <select
                                value={isCanceled}
                                onChange={(e) => {
                                    setIsCanceled(Number(e.target.value));
                                }}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                    isOptionSelected ? 'text-black dark:text-white' : ''
                                }`}
                                >
                                <option value="1"  className="text-body dark:text-bodydark">
                                    Ya
                                </option>
                                <option value="0"  className="text-body dark:text-bodydark">
                                    Tidak
                                </option>
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
                </>
            );
        }
    }

    const renderStatus = () => {
        if( pageId ){
            return (
                <>
                    <div className="mb-5.5">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            >
                            Status
                        </label>

                        {(() => {  
                            if(userContext.user.role.slug == "user"){
                                return (<h2>{userIzinApprove}</h2>);
                            }

                            return(
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        value={selectIzinApprove}
                                        onChange={(e) => {
                                            setSelectIzinApprove(e.target.value);
                                        }}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                            isOptionSelected ? 'text-black dark:text-white' : ''
                                        }`}
                                        >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Select status
                                        </option>
                                        {izinApprove.map((item:any, index) => (
                                            <option key={index} value={item.id} className="text-body dark:text-bodydark">
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
                            );
                        })()}
                             


                    </div>   
                </>
            );
        }
    }

    
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
                        <form onSubmit={handleSubmit} >

                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                    Name
                                    </label>
                                    <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                Details
                                </label>
                                <textarea
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                rows={6}
                                placeholder="Details"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>


                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                    Jenis Izin
                                </label>

                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        value={selectIzinJenis}
                                        onChange={(e) => {
                                            setSelectIzinJenis(e.target.value);
                                        }}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                            isOptionSelected ? 'text-black dark:text-white' : ''
                                        }`}
                                        >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Select jenis izin
                                        </option>
                                        {izinJenis.map((item:any, index) => (
                                            <option key={index} value={item.id} className="text-body dark:text-bodydark">
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

                            {renderCancel()}
                            {renderStatus()}
                

                            <div className="flex justify-end gap-4.5">
                                <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onClick={handleCancel}
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