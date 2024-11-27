import Swal from "sweetalert2";
export const handlError = (message: string) => {
    
    const mySwal = Swal;

    
    return mySwal.fire({
        icon: "error",
        title: "Oops...",
        text: message.replace(/<[^>]*>/g, ""),
        confirmButtonColor: "#000",
        confirmButtonText: "Okay!",
    });
}