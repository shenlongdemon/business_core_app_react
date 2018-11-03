import * as React from 'react'
interface OriginProps {
    firstName: string;
}
interface OriginState {
    age: number;
}

interface ExtendProps extends OriginProps {
    lastName: string;
}

interface ExtendState extends OriginState {
    address: string;
}

export default function ( WrappedComponent: React.ComponentType<OriginProps>): React.ComponentClass<ExtendProps, ExtendState> {
    return class extends React.Component<ExtendProps, ExtendState> {

        constructor(props: ExtendProps) {
            super(props);
            this.state = { address: 'Viet Name', age: 10 };
        }

        componentDidMount() {
            alert(this.props.lastName + ' ' + this.props.firstName + ' ' + this.state.age + ' ' + this.state.address);
        }
        
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}  