
import { environment } from "../../environments/environment";

export class AppVariables {

    public CATEGORY_ADD_URL:string;
    public CATEGORY_EDIT_URL:string;
    public CATEGORY_DELETE_URL:string;
    public CATEGORY_GET_URL:string;
    public CATEGORY_FETCH_URL:string;
    public PORTFOLIO_ADD_URL:string;
    public PORTFOLIO_EDIT_URL:string;
    public PORTFOLIO_DELETE_URL:string;
    public PORTFOLIO_GET_URL:string;
    public CONTACT_GET_URL:string;
    public CONTACT_DELETE_URL:string;
    public LOGIN_URL:string;
    constructor() {
        

        this.LOGIN_URL=`${environment.BACKEND_API_URL}/admin/login`;
        this.CATEGORY_ADD_URL=`${environment.BACKEND_API_URL}/category/add`;
        this.CATEGORY_EDIT_URL=`${environment.BACKEND_API_URL}/category/update`;
        this.CATEGORY_DELETE_URL=`${environment.BACKEND_API_URL}/category/delete`;
        this.CATEGORY_GET_URL=`${environment.BACKEND_API_URL}/category/records`;
        this.CATEGORY_FETCH_URL=`${environment.BACKEND_API_URL}/category/find`;
        this.PORTFOLIO_ADD_URL=`${environment.BACKEND_API_URL}/portfolio/add1`;
        this.PORTFOLIO_EDIT_URL=`${environment.BACKEND_API_URL}/portfolio/update1`;
        this.PORTFOLIO_DELETE_URL=`${environment.BACKEND_API_URL}/portfolio/delete1`;
        this.PORTFOLIO_GET_URL=`${environment.BACKEND_API_URL}/portfolio/records`;
        this.CONTACT_GET_URL=`${environment.BACKEND_API_URL}/contact/records`;
        this.CONTACT_DELETE_URL=`${environment.BACKEND_API_URL}/contact/delete`;
      
    }
}