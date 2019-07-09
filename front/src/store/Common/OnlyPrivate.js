import React, { useEffect, createContext } from 'react';
import { useUser } from 'store/User';
import { withRouter } from 'react-router-dom';

export const OnlyPrivateContext = createContext();

const OnlyPrivateProvider = ({ history, children }) => {
  const user = useUser();
  // const [selectedProjectId, setProjectId] = useState();
  useEffect(() => {
    if (!user) {
      history.replace('/');
    }
  }, [user]);
  return user ? (
    <OnlyPrivateContext.Provider>{children}</OnlyPrivateContext.Provider>
  ) : null;
};

// export const useOnlyPrivateValues = () => {
//   const { fns, ...values } = useContext(OnlyPrivateContext);
//   return values;
// };

// export const useOnlyPrivatefns = () => {
//   const { fns } = useContext(OnlyPrivateContext);
//   return fns;
// };

export default withRouter(OnlyPrivateProvider);
