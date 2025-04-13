import Swal from "sweetalert2";
 
export const successAlert = (message: string) => {
      
      const mySwal = Swal;
      return mySwal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 4000
      });
  }