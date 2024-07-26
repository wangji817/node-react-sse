import globalHook from '../../util/use-global-hook/src';
import initialState from './state';
import actions from './actions';

const useGlobal = globalHook(initialState, actions);
export default useGlobal;