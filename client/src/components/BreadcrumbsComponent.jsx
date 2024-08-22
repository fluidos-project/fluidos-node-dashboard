import { Breadcrumbs, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom";



export function BreadcrumbsComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                {pathnames.length > 0 ? (
                    <Link color="inherit" component={Link} to="/">
                        Home
                    </Link>
                ) : (
                    <Typography color="text.primary">Home</Typography>
                )}

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                        <Typography color="text.primary" key={to}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </Typography>
                    ) : (
                        <Link color="inherit" component={Link} to={to} key={to}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </>
    )
}