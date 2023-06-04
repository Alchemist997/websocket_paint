function SVG({ name, props }) {
    switch (name) {
        case 'pencil':
            return (
                <svg className='svg_pencil'
                    fill={props?.color ?? '#000'}
                    height="25px"
                    width="25px"
                    viewBox="0 0 512 512"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M500.111,71.068l-59.195-59.174c-15.859-15.849-41.531-15.862-57.386-0.014l-38.378,38.378L57.257,338.187
		c-7.775,7.768-13.721,17.165-17.443,27.498L1.801,471.476c-3.968,11.039-1.202,23.367,7.086,31.655
		c8.298,8.296,20.634,11.046,31.669,7.083l105.778-38.024c10.332-3.722,19.73-9.674,27.501-17.443l277.874-277.888l0.017,0.013
		l10.031-10.048l38.353-38.378l0.017-0.007C515.907,112.591,515.973,86.937,500.111,71.068z M136.729,445.475l-67.393,24.227
		l-27.02-27.02l24.213-67.393c0.184-0.485,0.416-0.964,0.609-1.441l71.024,71.024C137.679,445.073,137.221,445.302,136.729,445.475z
		 M153.759,434.678c-0.956,0.956-1.978,1.836-3.011,2.703L74.63,361.263c0.863-1.025,1.739-2.051,2.696-3.007L363.814,71.732
		l76.443,76.437L153.759,434.678z M480.031,108.385l-28.319,28.329l-1.421,1.421l-76.444-76.437l29.75-29.75
		c4.758-4.74,12.463-4.747,17.245,0.014l59.199,59.174C484.796,95.884,484.806,103.575,480.031,108.385z"/>
                </svg>
            );

        case 'line':
            return (
                <svg className='svg_line'
                    fill={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3.293,20.707a1,1,0,0,1,0-1.414l16-16a1,1,0,1,1,1.414,1.414l-16,16A1,1,0,0,1,3.293,20.707Z" />
                </svg>
            );

        case 'circle':
            return (
                <svg className='svg_circle'
                    stroke={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2" />
                </svg>
            );

        case 'rect':
            return (
                <svg className='svg_rect'
                    fill={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 0.75v30.5h30.5v-30.5zM28.75 28.75h-25.5v-25.5h25.5z"></path>
                </svg>
            );

        case 'undo':
            return (
                <svg className='svg_undo'
                    fill={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6,3.6V0L0,6l6,6V8c6-.27,7.53,3.76,7.88,5.77a.27.27,0,0,0,.53,0C17.08,2.86,6,3.6,6,3.6Z" />
                </svg>
            );

        case 'redo':
            return (
                <svg className='svg_redo'
                    fill={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M16,6,10,0V3.6S-1.08,2.86,1.59,13.78a.27.27,0,0,0,.53,0c.35-2,1.9-6,7.88-5.77v4Z" />
                </svg>
            );

        case 'download_img':
            return (
                <svg
                    fill="none"
                    stroke={props?.color ?? '#000'}
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11"
                        stroke="inherit"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25"
                        stroke="inherit"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M18 3V8M18 8L16 6M18 8L20 6"
                        stroke="inherit"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            );

        default:
            console.error('Компонент "SVG" был вызван с некорректным аргументом');
            return <div />;
    }
}

export default SVG;