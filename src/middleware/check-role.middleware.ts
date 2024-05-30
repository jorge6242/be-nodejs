import { Service } from "typedi";
import { ExpressMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import jwt from "jsonwebtoken";
import { UserService } from '../user/user.service';
import { SECRET } from '../utils/contants';
import { Role } from '../role/role.entity';

@Service()
@Middleware({ type: "before" })
export class CheckRoleMiddleware implements ExpressMiddlewareInterface {
    constructor(private userService: UserService) {}

    async use(request: any, response: any, next: (error?: any) => void): Promise<void> {
        
        if (request.path === "/user/login" || request.path.startsWith("/user/login")) {
            return next();
        }
        
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new HttpError(401, "No token provided"));
        }

        try {
            const decoded: any = jwt.verify(token, SECRET);
            const user: any = await this.userService.findByEmail(decoded.email);
            console.log('user.roles ', user.roles);
            if (!user) {
                return next(new HttpError(404, "User not found"));
            }
            const permissionList = user.roles.reduce((acc: string[], role: Role ) => {
                if(role.permissions){
                    return [...acc, ...role.permissions]
                }
                return acc
            },[])
            response.locals.permissions = permissionList;
            response.locals.user = user;
            response.locals.jwtPayload = decoded;
            next();
        } catch (error) {
            return next(new HttpError(401, "Invalid token or token expired"));
        }
    }
}
