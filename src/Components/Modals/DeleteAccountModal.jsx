import api from "../../api/apiClient.js";
function DeleteAccountModal({isOpen,onClose}){
    if(!isOpen) return null;
    const deleteAccount = async()=>{
        try {
            await api.delete("/users/delete-account");
            window.location.href="/";
            onClose();
        } catch (error) {
            alert(error.message);
            onClose();
        }
    }
    return(
        <>  
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:w-xl md:w-lg">
                <p className="text-xl italic">Are you sure you want to delete your account?</p>
                <div className="w-full flex gap-4">
                    <button className="bg-red-500 rounded-lg h-8 cursor-pointer flex-1" onClick={deleteAccount}>Yes</button>
                    <button className="bg-primary rounded-lg h-8 cursor-pointer flex-1" onClick={onClose}>No</button>
                </div>
            </div>
        </>
    );
}

export default DeleteAccountModal