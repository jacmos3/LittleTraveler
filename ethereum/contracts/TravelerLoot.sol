// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}






/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}




/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}




/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}









/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _setOwner(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _setOwner(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}





/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and make it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}














/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}







/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata is IERC721 {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}





/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        (bool success, bytes memory returndata) = target.delegatecall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    function _verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) private pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}









/**
 * @dev Implementation of the {IERC165} interface.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 */
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}


/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver(to).onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}







/**
 * @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Enumerable is IERC721 {
    /**
     * @dev Returns the total amount of tokens stored by the contract.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function tokenByIndex(uint256 index) external view returns (uint256);
}


/**
 * @dev This implements an optional extension of {ERC721} defined in the EIP that adds
 * enumerability of all the token ids in the contract as well as all token ids owned by each
 * account.
 */
abstract contract ERC721Enumerable is ERC721, IERC721Enumerable {
    // Mapping from owner to list of owned token IDs
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    uint256[] private _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) private _allTokensIndex;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC721) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override returns (uint256) {
        require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _allTokens.length;
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        require(index < ERC721Enumerable.totalSupply(), "ERC721Enumerable: global index out of bounds");
        return _allTokens[index];
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            _addTokenToAllTokensEnumeration(tokenId);
        } else if (from != to) {
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }
        if (to == address(0)) {
            _removeTokenFromAllTokensEnumeration(tokenId);
        } else if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721.balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    /**
     * @dev Private function to add a token to this extension's token tracking data structures.
     * @param tokenId uint256 ID of the token to be added to the tokens list
     */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures. Note that
     * while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
     * gas optimizations e.g. when performing a transfer operation (avoiding double writes).
     * This has O(1) time complexity, but alters the order of the _ownedTokens array.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = ERC721.balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    /**
     * @dev Private function to remove a token from this extension's token tracking data structures.
     * This has O(1) time complexity, but alters the order of the _allTokens array.
     * @param tokenId uint256 ID of the token to be removed from the tokens list
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }
}


contract TravelerLoot is ERC721Enumerable, ReentrancyGuard, Ownable {
    struct LootDetails {
        string fColor;
        string bColor;
        uint256 counter;
        bool verified;
    }

    struct Winner {
      address addr;
      uint16 count;
      bool elected;
    }
    Winner winner;
    mapping(address => LootDetails) public detailsByAddress;
    mapping(uint256 => address) public qualifiedList;
    address public treasurer;

//////////////////////////////BEGIN CONFIGURATIONS /////////////////////////////
    uint8 public enrolledLoots = 0;
    uint16 private qualifiedCounter = 0;
    uint16 public constant MAX_ID = 10000;
    uint16 private constant MAX_LOOT = 8000;
    uint16 public constant MAX_FOR_OWNER = 222;
    uint16 public constant MAX_FOR_QUALIFIED = 2000;
    uint160 public priceForPatrons = 1 ether;

    address constant public ORIGINAL_LOOT         = 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7;
    address constant public DERIVATIVE_AL         = 0xcC56775606730C96eA245D9cF3890247f1c57FB1;
    address constant public DERIVATIVE_CHAR       = 0x7403AC30DE7309a0bF019cdA8EeC034a5507cbB3;
    address constant public DERIVATIVE_CYBERLOOT  = 0x13a48f723f4AD29b6da6e7215Fe53172C027d98f;
    address constant public DERIVATIVE_DOGGO      = 0x76E3dea18e33e61DE15a7d17D9Ea23dC6118e10f;
    address constant public DERIVATIVE_GMANA      = 0xf4B6040A4b1B30f1d1691699a8F3BF957b03e463;
    address constant public DERIVATIVE_LOOTC      = 0xB89A71F1abe992Dc71349FC782b393dA2b6FB4C2;
    address constant public DERIVATIVE_LootHymns  = 0x83f1d1396B19Fed8FBb31Ed189579D07362d661d;
    address constant public DERIVATIVE_LootRealm  = 0x7AFe30cB3E53dba6801aa0EA647A0EcEA7cBe18d;
    address constant public DERIVATIVE_LootRock   = 0xeC43a2546625c4C82D905503bc83e66262f0EF84;
    address constant public DERIVATIVE_MLOOT      = 0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF;
    address constant public DERIVATIVE_NAME       = 0xb9310aF43F4763003F42661f6FC098428469aDAB;
    address constant public DERIVATIVE_QUESTS     = 0x4de9d18Fd8390c12465bA3C6cc8032992fD7655d;
    address constant public DERIVATIVE_SCORE      = 0x42A87e04f87A038774fb39c0A61681e7e859937b;
    address constant public DERIVATIVE_TREASURE   = 0xf3DFbE887D81C442557f7a59e3a0aEcf5e39F6aa;
    //assigned placeholders
    address private constant PH_OWNER = address(0);
    address private constant PH_USERS = address(1);
    address private constant PH_PATRONS = address(2);
    address private constant PH_LOOT_PATRONS = address(3);
    address private constant PH_WINNERS = address(4);

   string[] private colors = ["#726e6e","#464A97","#6eb7e5","#8d734a","#4bbda9","#949494","#887eaf","#e2a5a2","#d45b5b","#af4242","#91a18b","#935e7e","#c37ec8","#586754"];

   //TEST
   string[] private character = ["Energetic", "Good-natured", "Enthusiastic", "Challenging", "Charismatic", "Wise", "Modest", "Honest", "Protective", "Perceptive", "Providential", "Prudent", "Spontaneous", "Insightful", "Intelligent", "Intuitive", "Precise", "Sharing", "Simple", "Sociable","Sophisticated"];
   string[] private environment = ["Beaches", "Mountains", "Urban", "Countrysides", "Lakes", "Rivers", "Party islands", "Farms", "Tropical areas", "Snowy places", "Forests", "Historical cities", "Islands", "Wilderness", "Deserts", "Natural parks", "Old towns", "Small cities", "Villages", "Forests", "Small towns"];
   string[] private transport = ["Train", "Car", "Airplane", "Cruise", "4 wheel drive car", "Bus", "Airplane", "Convertible car", "Bicycle", "Motorbike", "Electric Bicycle", "Campervan", "Trailer", "Sailboat", "Electric car", "Scooter", "Bullet train", "Local train", "Cinquecento", "Hitch-hiking", "VW Beetle"];
   string[] private language = ["English", "Mandarin Chinese", "Hindi", "Spanish", "Arabic", "Bengali", "French", "Russian", "Portuguese", "Urdu", "Indonesian", "German", "Japanese", "Marathi", "Telugu", "Turkish", "Tamil", "Yue Chinese","Wu Chinese", "Korean", "Vietnamese"];
   string[] private talent = ["Cooking", "Painting", "Basketball", "Tennis", "Football", "Soccer", "Climbing", "Surfing", "Mathematics", "Swimming", "Photographer", "Fishing", "Street Artist", "Painting", "Writing", "Listening", "Pottery", "Dancing", "Architecture", "Repairing things", "Cheering people up"];
   string[] private place = ["Eiffel Tower", "St. Peter's Basilica", "Colosseum", "Parthenon", "Taj Mahal", "Forbidden City", "Las Vegas", "Sagrada Familia", "Cologne Cathedral", "Statue of Liberty"];
   string[] private experience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12","13","14","15","16","17","18","19","20","21"];
   string[] private accomodation = ["Hotel", "Apartment", "Hostel", "Tent", "Bed And Breakfast", "Guest house", "Chalet", "Cottage", "Boat", "Caravan", "Motorhome", "5 stars Hotel", "Suite in 5 Stars Hotel", "Tipi", "Tree House", "Bungalow", "Ranch", "Co-living", "Gablefront cottage", "Longhouse","Villa"];
   string[] private bag = ["Pen", "ID document", "E-Reader", "Water", "Cigarettes", "Swiss knife", "Mobile phone", "Notebook", "Laptop", "Digital Camera", "Lighter", "Earphones", "Beauty case", "Toothbrush", "Toothpaste", "Slippers", "Shirts", "Pants", "T-Shirts", "Socks", "Underwears"];
   string[] private occupation = ["Host", "Cook", "Nurse", "Miner", "Baker", "Writer", "Welder", "DeeJay", "Waiters", "Surgeon", "Plumber", "Dentist", "Youtuber", "Tiktoker", "Packager", "Zoologist", "Waitresse", "Treasurer", "Traveller", "Law Clerk","Detective"];
   //FINE TEST
/*
   string[] private character = ["Energetic", "Good-natured", "Enthusiastic", "Challenging", "Charismatic", "Wise", "Modest", "Honest", "Protective", "Perceptive", "Providential", "Prudent", "Spontaneous", "Insightful", "Intelligent", "Intuitive", "Precise", "Sharing", "Simple", "Sociable", "Sophisticated", "Benevolent", "Admirable", "Brilliant", "Accessible", "Calm", "Capable", "Optimistic", "Respectful", "Responsible", "Responsive", "Invulnerable", "Kind", "Lovable", "Loyal", "Practical", "Patient", "Patriot", "Reliable", "Secure", "Selfless", "Uncomplaining", "Understanding", "Resourceful", "Curious", "Daring", "Decisive", "Dedicated", "Disciplined", "Discreet", "Active", "Adaptable", "Adventurous", "Alert", "Appreciative", "Aspiring", "Dutiful", "Captivating", "Caring", "Efficient", "Elegant", "Eloquent", "Empathetic", "Earnest", "Educated", "Courteous", "Athletic", "Agreeable", "Balanced", "Creative", "Orderly", "Romantic", "Hardworking", "Scrupulous", "Considerate", "Contemplative", "Organized", "Original", "Passionate", "Relaxed", "Principled", "Profound", "Reflective", "Sensitive", "Sentimental", "Serious", "Cultured", "Forgiving", "Forthright", "Freethinking", "Friendly", "Fun-loving", "Generous", "Gentle", "Genuine", "Cheerful", "Clever", "Compassionate", "Conciliatory", "Confident", "Conscientio", "Honorable", "Humble", "Humorous", "Idealistic", "Fair", "Sporting", "Strong", "Subtle", "Sweet", "Sympathetic", "Systematic", "Tasteful", "Thorough", "Tidy", "Dramatic", "Tolerant", "Tractable", "Trusting", "Firm", "Flexible", "Focused", "Cooperative", "Courageous", "Imaginative", "Independent", "Innovative", "Observant", "Playful", "Gracious", "Vivacious", "Warm", "Well-read", "Self-reliant", "Charming", "Dynamic", "Helpful", "Peaceful", "Perfectionist", "Persuasive", "Popular", "Articulate", "Magnanimous", "Mature", "Methodical", "Moderate", "Objective", "Rational", "Realistic", "Witty"];
   string[] private environment = ["Beaches", "Mountains", "Urban", "Countrysides", "Lakes", "Rivers", "Party islands", "Farms", "Tropical areas", "Snowy places", "Forests", "Historical cities", "Islands", "Wilderness", "Deserts", "Natural parks", "Old towns", "Small cities", "Villages", "Forests", "Small towns", "Mountains", "Tropical islands", "Rivers", "Coral Reefs", "Wetlands", "Rainforests", "Grasslands", "Volcanic islands", "Chaparral", "Castles", "Deserted islands", "Mediterranean islands", "Mediterranean hills", "Theme parks", "Waterfalls", "Lentics", "Salt Marshs", "Mangrove Swamps", "Canyons", "Lost cities", "Temples", "Shrublands", "Underground cities", "Caves", "Cliffs", "Lagoons", "Taigas", "Tundras", "Fjords", "Thermal Pools"];
   string[] private transport = ["Train", "Car", "Airplane", "Cruise", "4 wheel drive car", "Bus", "Airplane", "Convertible car", "Bicycle", "Motorbike", "Electric Bicycle", "Campervan", "Trailer", "Sailboat", "Electric car", "Scooter", "Bullet train", "Local train", "Cinquecento", "Hitch-hiking", "VW Beetle", "Station wagon", "VW Bus", "Truck", "Off-road Vehicle", "Cab", "Motorboat", "Hot Air Balloon", "Cruise Ship", "Mountain bike", "Sports car", "Yacht", "RickShaw", "Horse carriage", "Biplane", "Orient Express", "Cargo ship", "Vespa", "Four-wheel drive", "Canoe", "Tractor", "Ferry", "Helicopter", "Jeep", "Low-rider", "Limousine", "Maglev", "Submarine", "Lambo", "Ferrari", "Rocket", "DeLorean", "Kia Sedona", "Magic carpet"];
   string[] private language = ["English", "Mandarin Chinese", "Hindi", "Spanish", "Arabic", "Bengali", "French", "Russian", "Portuguese", "Urdu", "Indonesian", "German", "Japanese", "Marathi", "Telugu", "Turkish", "Tamil", "Yue Chinese", "Wu Chinese", "Korean", "Vietnamese", "Hausa", "Iranian Persian", "Swahili", "Javanese", "Italian", "Western Punjabi", "Gujarati", "Thai", "Kannada", "Amharic", "Bhojpuri", "Eastern Punjabi", "Min Nan Chinese", "Nigerian Pidgin", "Jin Chinese", "Filipino", "Hakka Chinese", "Yoruba", "Burmese", "Sudanese Spoken Arabic", "Polish", "Odia", "Cambodian", "Croatian", "Danish", "Serbian", "Slovenian", "Estonian", "Latvian", "Lithuanian", "Finnish", "Czech", "Slovakian", "Greek", "Hungarian", "Swiss", "Icelandic", "Iraqi", "Irish", "Lao", "Lebanese", "Malagasy", "Berber", "Mongolian", "Montenegrin", "Burmese", "Nepalese", "Dutch", "Norwegian", "Rumenian", "Sinhala", "Tamil", "Uzbek", "Martian"];
   string[] private talent = ["Cooking", "Painting", "Basketball", "Tennis", "Football", "Soccer", "Climbing", "Surfing", "Mathematics", "Swimming", "Photographer", "Fishing", "Street Artist", "Painting", "Writing", "Listening", "Pottery", "Dancing", "Architecture", "Repairing things", "Cheering people up", "Physics", "Singing", "Dancing", "Intuition", "Baking", "Logic", "Running", "Sword-fighting", "Boxing", "Ice skating", "Jumping", "Climbing", "Tech Genius", "Hiking", "Knot-making", "Kitesurfing", "Sailing", "Gathering", "Hunting", "Archery", "Plumbing", "Dressmaking", "Navigating", "Horseback-riding", "Acting", "Singing", "Composing music", "Researching", "Book-keeping", "Investing", "Farming", "Brewing", "Winemaking", "Mining", "Acrobatics", "Cartography", "Memorizing things", "Speedreading", "Comforting others", "Parenting", "Stonemasonry", "Falconry", "Wrestling", "Whistling", "Juggling", "Rhyming", "Spying", "Keeping secrets", "Hypnotizing", "Storytelling", "Hair-styling", "Debating", "Solving disputes", "Negotiating", "Teaching", "Coding", "Computer-hacking", "Origami", "Calligraphy", "Playing chess", "Flipping NFTs", "Carvin pumpkins", "Katana sword fighter", "Programmin Solidity", "Creating Memes", "Auditing smart contracts", "Shitposting on Twitter", "Fighting BTC maxis", "Fighting Fiat maxis"];
   string[] private place = ["Eiffel Tower", "St. Peter's Basilica", "Colosseum", "Parthenon", "Taj Mahal", "Forbidden City", "Las Vegas", "Sagrada Familia", "Cologne Cathedral", "Statue of Liberty", "Pompeii", "Tulum", "Peterhof Palace", "Bangkok", "Tower of London", "Alhambra", "San Marco Square", "Ciudad de las Artes y las Ciencias", "Moscow Kremlin", "Copacabana", "Great Wall of China", "Havana", "Marrakech", "Edinburgh Castle", "Centre Pompidou", "Royal Palace of Madrid", "IkKil Cenote", "Arc de Triomphe", "Neuschwanstein Castle", "Machu Picchu", "Castillo San Felipe del Morro", "Monkey Forest", "Gili Trawangan", "Gili Air", "Caminito", "Gili Meno", "Santa Monica Beach", "Miami South Beach", "Waikiki",  "Whitehaven Beach", "Maya Bay", "Falassarna Beach", "Portstewart Strand", "Byron Bay", "Coffee Bay", "Praia do Sancho", "Phu Quoc Long Beach", "Navagio Beach", "Lincoln Memorial", "Rab Paradise Beach", "An Bang Beach", "Unawatuna", "La Concha", "Las Salinas", "Cape Maclear", "Renaissance Island", "Jeffreys Bay", "Vilanculos Beach", "Flamenco Beach", "Oludeniz Beach", "Capo Sant'Andrea", "Venice Beach", "Laughing Bird Caye", "Punalu'u", "Angel Falls", "Iguazu National Park", "Inle Lake", "Catatumbo Lightning", "Kaiteriteri Beach", "Belle Mare", "Wawel Castle", "Skagen Beach", "Isshiki Beach", "Radhanagar Beach", "Lisbona", "Haad Rin", "Phra Nang Beach", "Varanasi", "Beidaihe", "Na'ama Bay", "Akajima", "National Palace Museum", "Abaka Bay", "Mysore Palace", "Diani Beach", "Battle of Stalingrad Museum", "Cavendish Beach", "Little Corn beaches", "Marseille", "Fez", "Southwestern Beach", "Panama City Beach", "Porto da Barra", "Chefchouen", "Los Roques", "Tanjung Rhu", "Trunk Bay", "Natadola Beach", "Patnem Beach", "Bondi Beach", "Nungwi", "Negril Beach", "Dominical Beach", "Canggu Beach", "Karekare", "West Bay Beach", "Bahia Solano", "Balos Beach", "Cayo Paraiso", "Margaret River", "Navagio Beach", "Maya Bay", "Playa Paraiso", "Independence National Historical Park", "Warwick Long Bay", "Sunrise Beach", "Hanalei Bay", "Bottom Bay", "Meads Bay", "Long Bay", "Sun Island Beach", "Egremni Beach", "Crane Beach", "Boulders Beach", "Grand Anse", "Juara Beach", "Rarotonga", "Nihiwatu Beach", "Pigeon Point", "Luskentyre Beach", "The Baths", "El Nido", "Pulau Perhentian Kecil", "Palaui Island", "Champagne Beach", "Jaipur", "Wineglass Bay", "Cabbage Beach", "Anse de Grande Saline", "Anse Source d'Argent", "Valparaiso", "Grace Bay", "Rabbit Beach", "Grande Anse Beach", "Cuernos Del Paine", "Mount Thor", "Essaouira", "Alpamayo", "Laila Peak", "Bacalar lagoon", "Kazan Kremlin", "Mount Fuji", "Mount Kilimanjaro", "Bagan", "Stetind", "Trango Towers", "Tsaranoro", "Matira Beach", "Fortaleza", "Uluru", "Table Mountain", "Lake District", "Batu Caves", "Sagano Bamboo Forest", "Huacachina", "Chapultepec Castle", "Palenque", "Sutherland Falls", "Laguna Verde", "Verdon Gorge", "Socotra Island", "Saint Lucia", "Keukenhof", "Faroe Islands", "Guggenheim Museum", "Perito Moreno Glacier", "Freudenberg Town", "Luang Prabang", "Gardner Bay", "Lofoten", "Great Blue Hole", "Angkor Wat", "Petra", "Salar De Uyuni", "Galapagos Islands", "Jasper Creek", "The Nazca Lines", "Perito Moreno Glacier", "Aitutaki", "Halong Bay", "San Francisco", "Pyramids of Giza", "Matsumoto Castle", "Laguna Colorada", "Patan", "Niue Island", "Aoraki / Mount Cook", "Amber Fort", "Antigua", "Puerto Princesa Underground River", "Sahara", "Meteora Orthodox Monasteries", "Komodo Island", "Petronas Twin Towers", "Khajuraho", "Rock Islands of Palau", "Carthage", "Statue of Unity", "Karnak Temple", "Historic City of Segovia and Aqueduct", "Mont St. Michel", "Wadi Rum Protected Area", "Belize Barrier Reef Reserve System", "Blue Waterfall", "Lifou Island", "Huayna Picchu", "White Island", "Moorea", "Placencia Beach", "Yap Islands", "Martellago", "Easter Island", "South Pole", "Mount Rushmore", "Griffith Park", "Matera", "Perugia", "Annecy", "Burj Al Arab", "Marina Bay", "Al-Murabba Palace", "Greenwich meridian", "Vietnam Veterans Memorial", "Boracay", "Puerto Princesa", "Waikiki Beach", "Serengeti National Park", "Ngorongoro Crater", "Stone Town", "Atacama desert", "Gheralta", "Addis Abeba", "Bwindi Impenetrable forest National Park", "Vilankulos", "Blyde river Canyon South Africa", "Coffee bay", "Fish river Canyon", "Isla Magdalena", "Hue", "Bartolome island", "Jeddah Corniche", "Genovesa Island", "San Blas islands", "Salary Bay", "Salta", "Kuang Si Falls", "Granada", "Antigua", "Tikal", "White Sand National Park", "Seven Mile beach", "Victoria falls", "New Orleans", "Corn Islands", "Mahahual", "Mostar", "Merzouga", "Espanola Island", "Bocas del Toro", "Danakil Depression", "Omo Valley", "Opuwo", "Al-Masmak Fortress", "Sarajevo", "Pulau Derawan", "Okavango Delta", "Tsingy de Bemaraha National Park", "Burj Khalifa", "Pemba Island", "Denali National Park and Preserve", "Fitz Roy", "Mafia Island", "Linosa", "World War II Memorial", "Titicaca lake", "Quito", "Palace of Versailles", "Bitcoin beach (Playa El Zonte)", "Bitcoin Valley", "Main Hub", "The Street", "The Street", "The Black Sun", "Zion", "Construct", "Downtown", "Oasis", "Kolomna", "Waterloo", "Long Beach", "Twitter", "Discord", "Etherscan", "0x000000000000000000000000000000000000dead", "0x0000000000000000000000000000000000000000", "127.0.0.1", "::1", "tripscommunity.eth", "42.452483,-6.051345"];
   string[] private experience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
   string[] private accomodation = ["Hotel", "Apartment", "Hostel", "Tent", "B&B", "Guest house", "Chalet", "Cottage", "Boat", "Caravan", "Motorhome", "5 stars Hotel", "Suite in 5 Stars Hotel", "Tipi", "Tree House", "Bungalow", "Ranch", "Co-living", "Gablefront cottage", "Longhouse", "Villa", "Yurt", "Housebarn", "Adobe House", "Castle", "Rammed earth", "Sod house", "Underground living", "Wattle and daub", "Log house", "I-house", "Stilt house", "Venetian palace", "Igloo", "Trullo"];
   string[] private bag = ["Pen", "ID document", "E-Reader", "Water", "Cigarettes", "Swiss knife", "Mobile phone", "Notebook", "Laptop", "Digital Camera", "Lighter", "Earphones", "Beauty case", "Toothbrush", "Toothpaste", "Slippers", "Shirts", "Pants", "T-Shirts", "Socks", "Underwears"];
   string[] private occupation = ["Host", "Cook", "Nurse", "Miner", "Baker", "Writer", "Welder", "DeeJay", "Waiters", "Surgeon", "Plumber", "Dentist", "Youtuber", "Tiktoker", "Packager", "Zoologist", "Waitresse", "Treasurer", "Traveller", "Law Clerk", "Detective", "Chauffeur", "Unemployed", "Tour Guide", "Tax Lawyer", "Shitcoiner", "Ship Pilot", "Memecoiner", "Mail Clerk", "Freelancer", "DAO Member", "Bus Driver", "Taxi Driver", "Tax Auditor", "Radiologist", "QA Engineer", "Orthopedist", "Order Clerk", "NFT flipper", "Model Maker", "Mill Worker", "Meat Packer", "Job Printer", "Job Analyst", "Game Runner", "Fund Raiser", "Fine Artist", "Film Editor", "Copy Writer", "Book Editor", "Bank Teller", "Able Seamen", "Travel Clerk", "Travel Agent", "Teacher Aide", "Steel Worker", "Sportswriter", "Sports Agent", "Set Designer", "School Nurse", "Retail Buyer", "Psychiatrist", "Pediatrician", "Orthodontist", "Office Clerk", "Obstetrician", "NFT Marketer", "NFT Marketer", "Meme creator", "Meme creator", "Loan Officer", "Gynecologist", "Farm Manager", "Export Agent", "Degen trader", "Degen trader", "Craft Artist", "Cardiologist", "BSC Engineer", "Boat Builder", "Art Restorer", "Art Director", "VP of Product", "Travel Writer", "Traffic Agent", "Tax Collector", "Speech Writer", "Soil Engineer", "Social Worker", "Ship Engineer", "Script Editor", "Screen Writer", "Sales Manager", "Remote Worker", "Quarry Worker", "Private Nurse", "Police Artist", "Podcast owner", "Play 2 Earner", "Plant Manager", "Plant Breeder", "Patent Lawyer", "NFT Developer", "NFT collector", "Music Teacher", "Marking Clerk", "Law Professor", "Land Surveyor", "Hotel Manager", "Harbor Master", "Fashion Model", "Digital Nomad", "Dermatologist", "Custom Tailor", "Crypto Trader", "Civil Drafter", "Camp Director", "Cabinet Maker", "Bank Examiner", "Artists Agent", "Art Therapist", "Art Appraiser", "Video Engineer", "Title Searcher", "Title Examiner", "Tax Accountant", "Special Forces", "Soil Scientist", "Security Guard", "Sales Promoter", "Radio Operator", "Police Officer", "Pharmacy Aides", "Nursery Worker", "Music Director", "Museum Curator", "Mine Inspector", "Meter Mechanic", "Marine Drafter", "Loan Counselor", "Lathe Operator", "Home Economist", "Head of Growth", "Fire Inspector", "Fashion Artist", "Exhibit Artist", "Crossing Guard", "Credit Analyst", "Crane Operator", "Court Reporter", "Civil Engineer", "Casino Manager", "Casino Cashier", "Caption Writer", "Athletic Coach", "Animal Trainer", "Animal Breeder", "Watch Repairers", "Team Assemblers", "Solana Engineer", "Set Illustrator", "Sales Engineers", "Product Planner", "Plastic Surgeon", "Park Naturalist", "Ordinary Seamen", "Ophthalmologist", "Mining Engineer", "Marine Surveyor", "Marine Engineer", "Legal Secretary", "Legal Assistant", "Insurance Agent", "Hearing Officer", "Head of Lending", "Forest Engineer", "Food Batchmaker", "Floral Designer", "Fitness Trainer", "Finance Manager", "Fence Installer", "Delivery Driver", "Criminal Lawyer", "Credit Reporter", "Credit Adjuster", "Cost Accountant", "Casino Pit Boss", "Brokerage Clerk", "Appeals Referee", "Air Crew Member", "Zoo Veterinarian", "Wholesale Buyers", "Web Art Director", "Travel Counselor", "Textile Designer", "Service Provider", "Scanner Operator", "Safety Inspector", "Resource Teacher", "Purchasing Agent", "Psychiatric Aide", "Property Manager", "Phantom Engineer", "PFP NFT designer", "Package Designer", "Nuclear Engineer", "Newspaper Editor", "Military Officer", "Military Analyst", "Marine Architect", "IT Administrator", "Internal Auditor", "Insurance Lawyer", "Home Health Aide", "Health Educators", "Graphic Designer", "Funeral Director", "Flight Engineers", "Field Contractor", "Fashion Designer", "Exhibit Designer", "Editorial Writer", "Dental Hygienist", "Dental Assistant", "Crypto treasurer", "Commercial Diver", "Ceramic Engineer", "Casting Director", "Carpet Installer", "Career Counselor", "Brattice Builder", "Bitcoin educator", "Bitcoin Core Dev", "Bitcoin Core Dev", "Bicycle Mechanic", "Benefits Manager", "Athletic Trainer", "Aquarium Curator", "Animal Scientist", "Air Crew Officer", "Admiralty Lawyer", "Adjustment Clerk", "Voice Pathologist", "Survey Researcher", "Securities Broker", "Sanitary Engineer", "Recreation Leader", "Railroad Engineer", "Property Assessor", "Probation Officer", "Preschool Teacher", "Physics Professor", "Pediatric Dentist", "Parts Salesperson", "Office Supervisor", "Nursing Professor", "Medical Secretary", "Medical Assistant", "Massage Therapist", "Marketing Manager", "Library Assistant", "Laboratory Tester", "Interior Designer", "Infantry Officers", "Funeral Attendant", "Food Technologist", "Fire Investigator", "Financial Planner", "Financial Analyst", "Family Caseworker", "Explosives Worker", "Ethereum educator", "Elevator Mechanic", "DeFi Yeild Farmer", "Customs Inspector", "Computer Operator", "Community Manager", "Child Care Worker", "Chemical Engineer", "Budget Accountant", "Biology Professor", "Ballistics Expert", "Ambulance Drivers", "Aircraft Mechanic", "Aircraft Examiner", "Account Collector", "Wildlife Biologist", "Veterinarian (VMD)", "Systems Accountant", "Structural Drafter", "Standards Engineer", "Sport Psychologist", "Speech Pathologist", "Solidity Developer", "Restaurant Manager", "Real Estate Lawyer", "Real Estate Broker", "Railroad Inspector", "Purchasing Manager", "Production Planner", "Physical Therapist", "Petroleum Engineer", "Pesticide Handlers", "Peace Corps Worker", "Nurse Practitioner", "New Accounts Clerk", "Motorboat Mechanic", "Mechanical Drafter", "Materials Engineer", "Mapping Technician", "Library Technician", "Library Consultant", "Insurance Adjuster", "Industrial Painter", "Hydraulic Engineer", "General Internists", "General FarmWorker", "Gas Plant Operator", "Furniture Designer", "Fraud Investigator", "Fish & Game Warden", "Financial Examiner", "Facilities Planner", "Electrical Drafter", "Dry Wall Installer", "Dairy Technologist", "Correction Officer", "Corporation Lawyer", "Congressional Aide", "Compliance Officer", "City Planning Aide", "Casino Cage Worker", "Business Professor", "Bus Boy / Bus Girl", "Building Inspector", "Billing Specialist", "Aircraft Assembler", "Traffic Technicians", "Structural Engineer", "Stationary Engineer", "Sociology Professor", "Social Psychologist", "Scientific Linguist", "School Psychologist", "Retail Salespersons", "Residence Counselor", "Rail Yard Engineers", "Radio & TV Producer", "Publications Editor", "Property Accountant", "Political Scientist", "Poets and Lyricists", "Pharmacy Technician", "Petroleum Geologist", "Pest Control Worker", "Personnel Recruiter", "Personnel Assistant", "Operating Engineers", "Nuclear Technicians", "Motorcycle Mechanic", "Mechanical Engineer", "Materials Scientist", "Materials Inspector", "Landscape Architect", "Irrigation Engineer", "Industrial Engineer", "Industrial Designer", "Hosts and Hostesses", "High School Teacher", "Health Case Manager", "Geography Professor", "Furniture Finishers", "Fashion Coordinator", "Family Practitioner", "Executive Secretary", "Entertainment Agent", "Engineering Manager", "Education Professor", "Economics Professor", "Dietetic Technician", "DeFi Airdrop Hunter", "Contract Specialist", "Computer Programmer", "Commercial Designer", "Chemistry Professor", "Casino Floor Person", "Bus Driver (School)", "Border Patrol Agent", "Blockchain Engineer", "Blockchain educator", "Biomedical Engineer", "Avionics Technician", "Automotive Engineer", "Automobile Mechanic", "Veterinary Assistant", "Utility Meter Reader", "Teacher of the Blind", "Stained Glass Artist", "Soil Conservationist", "Social Media Manager", "Retail Store Manager", "Reliability Engineer", "Real Estate Assessor", "Radio & TV Announcer", "Radiation Therapists", "Psychology Professor", "Power Plant Operator", "Postal Service Clerk", "Petroleum Technician", "Occupational Analyst", "Medical Photographer", "Mechanical Inspector", "Marine/Port Engineer", "Locomotive Engineers", "Landscape Contractor", "Kindergarten Teacher", "Insulation Installer", "Industrial Therapist", "Industrial Hygienist", "Historical Archivist", "Highway Patrol Pilot", "Head of Partnerships", "Field Health Officer", "Electronics Engineer", "Electrical Engineers", "Crypto podcaster", "Correspondence Clerk", "Controller", "Construction Manager", "Construction Laborer", "Construction Driller", "Commercial Fisherman", "Clinical Sociologist", "Chemical Technicians", "Broadcast Technician", "Axie Infinity player", "ATM Machine Servicer", "Animation Cartoonist", "Warehouse Stock Clerk", "TripsCommunity Member", "Technical Illustrator", "Surveying Technicians", "Statistical Assistant", "Skin Care Specialists", "Shoe Machine Operator", "Respiratory Therapist", "Real Estate Appraiser", "Radiologic Technician", "Prosthetic Technician", "Physician's Assistant", "Parking Lot Attendant", "Orthodontic Assistant", "Offset Press Operator", "NFT Community Manager", "Middle School Teacher", "Merchandise Displayer", "Marine Cargo Surveyor", "Manual Arts Therapist", "Mail Machine Operator", "Legislative Assistant", "Janitorial Supervisor", "Insurance Underwriter", "Instrument Technician", "Immigration Inspector", "Forest Fire Inspector", "Food & Drug Inspector", "Farm Labor Contractor", "Door To Door Salesmen", "Deaf Students Teacher", "DAO Community Manager", "Clinical Psychologist", "Carpenter's Assistant", "Biological Technician", "Axie Infinity scholar", "Animal Control Worker", "Agricultural Engineer", "Accounting Specialist", "Wildlife Control Agent", "Unemployment Inspector", "Smart contract auditor", "Narcotics Investigator", "Maintenance Supervisor", "Insurance Claims Clerk", "Horticulture Therapist", "Employment Interviewer", "County or City Auditor", "Conservation Scientist", "Catering Administrator", "Broadcast News Analyst", "Agricultural Inspector", "Smart Contract Engineer", "Reverse Airdrops Manager", "Proof of Stake validator", "Marketing Campaigns Manager", "Lightning Network Developer", "Anonymous DeFi Protocol Lead", "Senior Full Stack Web Developer", "Blockchain Consultant Project Lead", "Blockchain & Cryptocurrency Analyst", "Blockchain Consultant Project Manager"];
*/

    uint256 private constant EXPIRATION = 1790546399; //Sun 27 Sep 2026 21:59:59
    string private constant WHITE = "white";
    string private constant BLACK = "black";
    string private constant GOLD = "gold";
    string private constant PLATINUM = "#d5d6d8";
    string private constant ERROR_TOKEN_ID_INVALID = "Token ID invalid";
    string private constant ERROR_ADDRESS_NOT_VERIFIED = "Loot derivative address not verified. Try another";
    string private constant ERROR_NOT_THE_OWNER = "You do not own the token of the address";
    string private constant ERROR_DOM_40TH_BIRTHDAY = "Function only valid till Dom's 40th bday";
    string private constant ERROR_LOW_VALUE = "Set a higher value";
    string private constant ERROR_COMPETITION_ENDED = "Competition has endend. Check the winner!";
    string private constant ERROR_COMPETITION_ONGOING = "Competition is still ongoing!";
    string private constant ERROR_DIVISION_BY_ZERO = "Division By Zero!";

////////////////////////////// END CONFIGURATIONS //////////////////////////////

    constructor() ERC721("TravelerLoot", "TRAVELER") Ownable(){
      treasurer = msg.sender;
      LootDetails memory details = LootDetails({bColor:BLACK,fColor:WHITE,counter:0,verified:true});
      detailsByAddress[PH_USERS] = details;
      detailsByAddress[PH_OWNER] = details;
      detailsByAddress[DERIVATIVE_AL] = details;
      detailsByAddress[DERIVATIVE_CHAR] = details;
      detailsByAddress[DERIVATIVE_CYBERLOOT] = details;
      detailsByAddress[DERIVATIVE_DOGGO] = details;
      detailsByAddress[DERIVATIVE_GMANA] = details;
      detailsByAddress[DERIVATIVE_LOOTC] = details;
      detailsByAddress[DERIVATIVE_LootHymns] = details;
      detailsByAddress[DERIVATIVE_LootRealm] = details;
      detailsByAddress[DERIVATIVE_LootRock] = details;
      detailsByAddress[DERIVATIVE_MLOOT] = details;
      detailsByAddress[DERIVATIVE_NAME] = details;
      detailsByAddress[DERIVATIVE_QUESTS] = details;
      detailsByAddress[DERIVATIVE_SCORE] = details;
      detailsByAddress[DERIVATIVE_TREASURE] = details;
      detailsByAddress[PH_PATRONS] = LootDetails({bColor:"#faed72",fColor:"#a43e3d",counter:0,verified:true});
      detailsByAddress[PH_LOOT_PATRONS] = LootDetails({bColor:GOLD,fColor:BLACK,counter:0,verified:true});
      detailsByAddress[ORIGINAL_LOOT] = LootDetails({bColor:PLATINUM,fColor:BLACK,counter:0,verified:true});

    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function extractOutput(string[] memory sourceArray, uint8 toHoundred, string memory keyPrefix) internal view returns (string memory){
        uint8 delta = toHoundred > 95 ? 1 : toHoundred > 80 ? 2 : 3;
        uint8 len = uint8(sourceArray.length);
        uint8 x = len / 3;
        uint8 min = len - (delta * x);
        uint8 max = (len - 1) - ((delta - 1) * x);
        uint8 rand = uint8((random(string(abi.encodePacked(msg.sender, toHoundred, keyPrefix ))) % (max - min + 1)) + min);
        return sourceArray[rand];
    }

    function getEnvironment(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "ENVIRONMENT", environment);
    }

    function getTalent(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TALENT", talent);
    }

    function getPlace(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "PLACE", place);
    }

    function getCharacter(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "CHARACTER", character);
    }

    function getTransport(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TRANSPORT", transport);
    }

    function getLanguage(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "LANGUAGE", language);
    }

    function getExperience(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "EXPERIENCE", experience);
    }

    function getOccupation(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "OCCUPATION", occupation);
    }

    function getAccomodation(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "ACCOMODATION", accomodation);
    }

    function getBag(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "BAG", bag);
    }

    function pluck(uint256 tokenId, string memory keyPrefix, string[] memory sourceArray) internal view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
        uint8 toHoundred = uint8(rand % 100);
        string memory output = extractOutput(sourceArray,toHoundred, keyPrefix);

        return output;
    }

    function addressURI(address patronAddress) external view returns (string memory){
        return tokenURI(uint160(patronAddress));
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        LootDetails memory details = detailsByAddress[qualifiedList[tokenId]];
        string[3] memory parts;
        parts[0] = string(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill:', details.fColor,'; font-family: serif; font-size: 14px; }</style> <rect width="100%" height="100%" fill="',details.bColor,'" /><text x="10" y="20" class="base">'));
        parts[1] = string(abi.encodePacked(getEnvironment(tokenId),'</text><text x="10" y="40" class="base">',getTalent(tokenId),'</text><text x="10" y="60" class="base">',getPlace(tokenId),'</text><text x="10" y="80" class="base">',getCharacter(tokenId),'</text><text x="10" y="100" class="base">',getTransport(tokenId),'</text><text x="10" y="120" class="base">',getLanguage(tokenId)));
        parts[2] = string(abi.encodePacked('</text><text x="10" y="140" class="base">',getExperience(tokenId),'</text><text x="10" y="160" class="base">',getOccupation(tokenId),'</text><text x="10" y="180" class="base">',getAccomodation(tokenId),'</text><text x="10" y="200" class="base">',getBag(tokenId),'</text></svg>'));

        string memory compact = string(abi.encodePacked(parts[0], parts[1], parts[2]));
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Traveler Loot #', toString(tokenId), '", "description": "Traveler Loot is randomized character generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use the Traveler Loot in any way you want.", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(compact)), '"}'))));

        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    //given a qualified loot derivateve address, returns the count for that addr
    function counts(address addr) external view returns (uint256){
        LootDetails memory details = detailsByAddress[addr];
        require(details.verified, ERROR_ADDRESS_NOT_VERIFIED);
        return details.counter;
    }

    function checkWinning(address winningAddress, uint16 winningCount, address newAddress, uint16 newCount) internal pure returns(address,uint16){
        return newCount > winningCount ? (newAddress, newCount) : (winningAddress, winningCount);
    }

    //this function only compares the qualified loot & loot-derivatives projects
    function whoIsWinning() public view returns (address, uint16){
      if (winner.elected == false){
        address winningLoot = ORIGINAL_LOOT;
        uint16 winningCount = uint16(detailsByAddress[winningLoot].counter);
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_AL, uint16(detailsByAddress[DERIVATIVE_AL].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_CHAR, uint16(detailsByAddress[DERIVATIVE_CHAR].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_CYBERLOOT, uint16(detailsByAddress[DERIVATIVE_CYBERLOOT].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_DOGGO, uint16(detailsByAddress[DERIVATIVE_DOGGO].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_GMANA, uint16(detailsByAddress[DERIVATIVE_GMANA].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_LOOTC, uint16(detailsByAddress[DERIVATIVE_LOOTC].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_LootHymns, uint16(detailsByAddress[DERIVATIVE_LootHymns].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_LootRealm, uint16(detailsByAddress[DERIVATIVE_LootRealm].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_LootRock, uint16(detailsByAddress[DERIVATIVE_LootRock].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_MLOOT, uint16(detailsByAddress[DERIVATIVE_MLOOT].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_NAME, uint16(detailsByAddress[DERIVATIVE_NAME].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_QUESTS, uint16(detailsByAddress[DERIVATIVE_QUESTS].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_SCORE, uint16(detailsByAddress[DERIVATIVE_SCORE].counter));
        (winningLoot, winningCount) = checkWinning(winningLoot,winningCount, DERIVATIVE_TREASURE, uint16(detailsByAddress[DERIVATIVE_TREASURE].counter));
        return (winningLoot, winningCount);
      }
      return (winner.addr,winner.count);
    }

    function finalizeMint(uint256 id, address qualifiedAddress, uint8 percentage, bool positive) internal{
      require (percentage != 0 && (100  / percentage) != 0, ERROR_DIVISION_BY_ZERO);
      uint160 x = priceForPatrons / (100 / percentage);
      priceForPatrons = positive ? priceForPatrons + x : priceForPatrons - x;
      detailsByAddress[qualifiedAddress].counter++;
      qualifiedList[id] = qualifiedAddress;
      _safeMint(_msgSender(), id);
    }

    function claim(uint256 tokenId) external nonReentrant {
        require(tokenId > MAX_FOR_QUALIFIED + MAX_FOR_OWNER && tokenId <= MAX_ID, ERROR_TOKEN_ID_INVALID);
        finalizeMint(tokenId,PH_USERS,10,false);
    }

    function claimForOwner(uint256 tokenId) external nonReentrant onlyOwner{
        require(tokenId > MAX_FOR_QUALIFIED && tokenId <= MAX_FOR_QUALIFIED + MAX_FOR_OWNER, ERROR_TOKEN_ID_INVALID);
        finalizeMint(tokenId,PH_OWNER,50,false);
    }

    function claimForQualifiedLoot(uint256 tokenId, address contractAddress) external nonReentrant {
        require(!winner.elected, ERROR_COMPETITION_ENDED);
        LootDetails storage details = detailsByAddress[contractAddress];
        require(details.verified, ERROR_ADDRESS_NOT_VERIFIED);
        IERC721 looter = IERC721(contractAddress);
        require(tokenId > 0 && looter.ownerOf(tokenId) == _msgSender(), ERROR_NOT_THE_OWNER);
        if (details.counter == 0){
            details.bColor = colors[enrolledLoots++];
        }

        uint16 discreetId = uint16(tokenId % MAX_FOR_QUALIFIED);

        if (++qualifiedCounter == MAX_FOR_QUALIFIED){
            (winner.addr,winner.count) = whoIsWinning();
            winner.elected = true;
        }
        finalizeMint(discreetId == 0 ? MAX_FOR_QUALIFIED : discreetId, contractAddress, 20, true);
    }

    function patronMinting(address addr,uint8 percentage, bool positive) internal{
      uint160 castedAddress = uint160(_msgSender());
      require(castedAddress > MAX_ID, ERROR_ADDRESS_NOT_VERIFIED);
      finalizeMint(castedAddress, addr, percentage, positive);
    }

    function claimForPatrons() external payable nonReentrant {
        require(msg.value >= priceForPatrons, ERROR_LOW_VALUE);
        patronMinting(PH_PATRONS, 50, true);
    }

    function claimForLooters(uint256 lootId) external nonReentrant {
        require(lootId > 0 && lootId <= MAX_LOOT, ERROR_TOKEN_ID_INVALID);
        IERC721 looter = IERC721(ORIGINAL_LOOT);
        require(looter.ownerOf(lootId) == _msgSender(), ERROR_NOT_THE_OWNER);
        require(block.timestamp <= EXPIRATION, ERROR_DOM_40TH_BIRTHDAY);
        patronMinting(PH_LOOT_PATRONS, 1, true);
    }

    function claimForWinners(uint16 tokenId) external nonReentrant {
        require(winner.elected, ERROR_COMPETITION_ONGOING);
        require(tokenId > 0 && tokenId <= MAX_FOR_QUALIFIED, ERROR_TOKEN_ID_INVALID);
        IERC721 winr = IERC721(winner.addr);
        require(winr.ownerOf(tokenId) == _msgSender(), ERROR_NOT_THE_OWNER);
        patronMinting(PH_WINNERS, 1, true);
    }
/*
    function increasePrice() external onlyOwner nonReentrant{
        require(block.timestamp <= EXPIRATION, ERROR_DOM_40TH_BIRTHDAY);
        //increase price by 10%
        priceForPatrons += priceForPatrons/10;
    }
    */
    function withdraw() external onlyOwner {
        payable(treasurer).transfer(address(this).balance);
    }

    function setTreasurer(address newAddress) external onlyOwner{
      treasurer = newAddress;
    }

    function toString(uint256 value) internal pure returns (string memory) {
    // Inspired by OraclizeAPI's implementation - MIT license
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}


/// [MIT License]
/// @title Base64
/// @notice Provides a function for encoding some bytes in base64
/// @author Brecht Devos <brecht@loopring.org>
library Base64 {

    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(input, 0x3F))), 0xFF))
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}
