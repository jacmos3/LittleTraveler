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
        uint16 counter;
        bool verified;
    }
    address public lootAddress = 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7;
    mapping(address => LootDetails) public detailsByAddress;
    mapping(uint256 => address) public teamList;
    uint16 constant MAX_ID = 10000;
    uint16 constant MAX_FOR_OWNER = 222;
    uint16 constant MAX_FOR_LOOTERS = 2000;
    uint160 public price;
    address public treasurer;

    constructor() ERC721("TravelerLoot", "TRAVELER") Ownable() {
      treasurer = msg.sender;
      price = 1 ether;
      //this is for loot&loot-derivative owners using claimQualified function.
      //They will obtain a super rare special edition Traveler Loot (few pieces)
      detailsByAddress[lootAddress]                                = LootDetails({bColor:"#d5d6d8",fColor:"black",counter:0,verified:true});  //LOOT
      detailsByAddress[0xb9310aF43F4763003F42661f6FC098428469aDAB] = LootDetails({bColor:"#949494",fColor:"white",counter:0,verified:true});  //NAME
      detailsByAddress[0xB89A71F1abe992Dc71349FC782b393dA2b6FB4C2] = LootDetails({bColor:"#726e6e",fColor:"white",counter:0,verified:true});  //LOOTC - LootCreatures
      detailsByAddress[0xf3DFbE887D81C442557f7a59e3a0aEcf5e39F6aa] = LootDetails({bColor:"#6eb7e5",fColor:"white",counter:0,verified:true});  //TREASURE
      detailsByAddress[0x7403AC30DE7309a0bF019cdA8EeC034a5507cbB3] = LootDetails({bColor:"#4bbda9",fColor:"white",counter:0,verified:true});  //CHAR
      detailsByAddress[0x7AFe30cB3E53dba6801aa0EA647A0EcEA7cBe18d] = LootDetails({bColor:"#464A97",fColor:"white",counter:0,verified:true});  //LootRealm
      detailsByAddress[0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF] = LootDetails({bColor:"#935e7e",fColor:"white",counter:0,verified:true});  //MLOOT
      detailsByAddress[0xcC56775606730C96eA245D9cF3890247f1c57FB1] = LootDetails({bColor:"#887eaf",fColor:"white",counter:0,verified:true});  //AL
      detailsByAddress[0x83f1d1396B19Fed8FBb31Ed189579D07362d661d] = LootDetails({bColor:"#e2a5a2",fColor:"white",counter:0,verified:true});  //LootHymns
      detailsByAddress[0x42A87e04f87A038774fb39c0A61681e7e859937b] = LootDetails({bColor:"#c37ec8",fColor:"white",counter:0,verified:true});  //SCORE
      detailsByAddress[0x76E3dea18e33e61DE15a7d17D9Ea23dC6118e10f] = LootDetails({bColor:"#d45b5b",fColor:"white",counter:0,verified:true});  //DOGGO
      detailsByAddress[0xeC43a2546625c4C82D905503bc83e66262f0EF84] = LootDetails({bColor:"#af4242",fColor:"white",counter:0,verified:true});  //LootRock
      detailsByAddress[0xf4B6040A4b1B30f1d1691699a8F3BF957b03e463] = LootDetails({bColor:"#91a18b",fColor:"white",counter:0,verified:true});  //GMANA
      detailsByAddress[0x13a48f723f4AD29b6da6e7215Fe53172C027d98f] = LootDetails({bColor:"#586754",fColor:"white",counter:0,verified:true});  //CYBERLOOT
      detailsByAddress[0x4de9d18Fd8390c12465bA3C6cc8032992fD7655d] = LootDetails({bColor:"#8d734a",fColor:"white",counter:0,verified:true});  //QUESTS

      //This is for claim function (= owner and normal users).
      //They will obtain a common black&white Traveler Loot
      detailsByAddress[address(0)] = LootDetails({bColor:"black",fColor:"white",counter:0,verified:true});

      //This is for Elites who wants mint by using their address as tokenId.
      //They will obtain a reserved Traveler Loot in special edition.
      detailsByAddress[address(1)] = LootDetails({bColor:"#faed72",fColor:"#a43e3d",counter:0,verified:true});

      //This is for Looters who wants mint by using their address as tokenId.
      //They get a gold&black Traveler Loot
      detailsByAddress[address(2)] = LootDetails({bColor:"gold",fColor:"black",counter:0,verified:true});
    }

    //not yet sorted
    string[] private environment = [
        "Urban",
        "Beaches",
        "Mountains",
        "Countrysides",
        "Lakes",
        "Rivers",
        "Party islands",
        "Farms",
        "Tropical areas",
        "Snowy places",
        "Forests",
        "Deserts",
        "Wilderness",
        "Rainforests",
        "North Pole",
        "South Pole",
        "Volcanic islands",
        "Natural parks",
        "Historical cities",
        "Old towns",
        "Small cities",
        "Small towns",
        "Villages",
        "Jungla" //Aggiunta per arrivare al multiplo di 3
    ];

      //not yet sorted
    string[] private talent = [
        "Tech Genius",
        "Intuition",
        "Singer",
        "Dancer",
        "Painter",
        "Basketball Player",
        "Tennis Player",
        "Football Player",
        "Soccer Player",
        "Climber",
        "Swimmer",
        "Photographer",
        "Street Artist",
        "Painting",
        "Writing",
        "Pottery",
        "Dancing",
        "Mathematics",
        "Architecture",
        "Physics",
        "Spelling",
        "Cooking",
        "Baking",
        "Logic",
        "Running",
        "Sword-fighting",
        "Boxing",
        "Ice skating",
        "Jumping",
        "Climbing",
        "Hiking",
        "Knot-making",
        "Sailing",
        "Repairing things",
        "Cheering people up",
        "Bridgebuilding",
        "Gathering",
        "Hunting",
        "Fishing",
        "Archery",
        "Plumbing",
        "Dressmaking",
        "Navigating",
        "Horseback-riding",
        "Acting",
        "Singing",
        "Composing music",
        "Roofing",
        "Researching",
        "Book-keeping",
        "Investing",
        "Listening",
        "Farming",
        "Brewing",
        "Winemaking",
        "Mining",
        "Acrobatics",
        "Cartography",
        "Memorizing things",
        "Speedreading",
        "Comforting others",
        "Parenting",
        "Stonemasonry",
        "Falconry",
        "Wrestling",
        "Whistling",
        "Juggling",
        "Rhyming",
        "Spying",
        "Keeping secrets",
        "Lying",
        "Storytelling",
        "Hair-styling",
        "Debating",
        "Dispute resolution",
        "Negotiating",
        "Teaching",
        "Coding",
        "Computer-hacking",
        "Origami",
        "Calligraphy",
        "Playing chess",
        "Carvin pumpkins",
        "Hypnotizing"
    ];

    //sorted
    string[] private place = ["Eiffel Tower, Paris, France", "St. Peter's Basilica, Vatican City", "Colosseum, Rome, Italy", "Parthenon, Athens, Greece", "Taj Mahal, Agra, India", "Forbidden City, Beijing, China", "Las Vegas, Nevada", "Sagrada Familia, Barcelona, Spain", "Cologne Cathedral, Cologne, Germany", "Statue of Liberty, New York City, USA", "Pompeii, Naples, Italy", "Musée d'Orsay, Paris, France", "Schönbrunn Palace, Vienna, Austria", "Tulum, Quintana Roo, Mexico", "Peterhof Palace, Saint Petersburg, Russia", "Bangkok, Thailand", "Tower of London, London, UK", "Alhambra, Granada, Spain", "San Marco Square, Venice, Italy", "Ciudad de las Artes y las Ciencias, Valencia, Spain", "Teotihuacán, Mexico", "Moscow Kremlin, Moscow, Russia", "Copacabana, Rio de Janeiro, Brazil", "Great Wall of China", "Havana, Cuba", "Marrakech, Morocco", "Chichén Itzá, Yucatán, Mexico", "Edinburgh Castle, Edinburgh, Scotland", "Centre Pompidou, Paris, France", "Mosque–Cathedral of Córdoba, Córdoba, Spain", "Royal Alcázar of Seville, Seville, Spain", "Royal Palace of Madrid, Madrid, Spain", "IkKil Cenote, Tinúm Municipality, Yucatán, Mexico", "Arc de Triomphe, Paris, France", "Neuschwanstein Castle, Hohenschwangau, Germany", "Machu Picchu, Cusco, Peru", "Castillo San Felipe del Morro, San Juan, Puerto Rico", "Monkey Forest , Ubud, Bali, Indonesia", "Gili Trawangan, Lombok, Indonesia", "Gili Air, Lombok, Indonesia", "Caminito, Buenos Aires", "Gili Meno, Lombok, Indonesia", "Santa Monica Beach, California", "South Beach, Miami, Florida", "Waikiki, Honolulu, Hawaii", "Topkapı Palace, Istanbul, Turkey", "Whitehaven Beach, Whitsunday Island, Australia", "Maya Bay, Phi Phi Islands, Thailand", "Falassarna Beach, Crete, Greece", "Portstewart Strand, Northern Ireland", "Byron Bay, Australia", "Coffee Bay, Wild Coast, South Africa", "Praia do Sancho, Fernando de Noronha, Brazil", "Hot Water Beach, Coromandel Peninsula, New Zealand", "Long Beach, Phu Quoc, Vietnam", "Navagio Beach, Zakynthos, Greece", "Lincoln Memorial, Washington, D.C., USA", "Paradise Beach, Rab, Croatia", "Lover's Beach, Baja California Sur, Mexico", "Arashi Beach, Aruba", "An Bang Beach, Hoi An, Vietnam", "Unawatuna, Sri Lanka", "Bandon, Oregon, United States", "Puka Beach, Boracay, Philippines", "Ffryes Beach, Antigua", "La Concha, Spain", "Las Salinas, Ibiza, Spain", "Cape Maclear, Malawi", "Renaissance Island, Aruba", "Jeffreys Bay, South Africa", "Vilanculos Beach, Mozambique", "Flamenco Beach, Puerto Rico", "Oludeniz Beach, Turkey", "Capo Sant'Andrea, Elba, Italy", "Venice Beach, California, United States", "Plage de Piémanson, France", "Laughing Bird Caye, Belize", "Punalu'u, Hawaii, United States", "Angel Falls, Bolívar, Venezuela", "Iguazu National Park, Argentina", "Inle Lake, Myanmar", "Catatumbo Lightning, Maracaibo, Venezuela", "Kaiteriteri Beach, Nelson, New Zealand", "Belle Mare, Mauritius", "Wawel Castle, Kraków, Poland", "Skagen Beach, Denmark", "Isshiki Beach, Hayama, Japan", "Radhanagar Beach, Andaman Islands, India", "Lisbona, Portugal", "Haad Rin, Ko Pha Ngan, Thailand", "Phra Nang Beach, Railay, Thailand", "Varanasi, India", "Beidaihe, China", "Na'ama Bay, Sharm el Sheikh, Egypt", "Akajima, Okinawa, Japan", "National Palace Museum, Taipei, Taiwan", "Abaka Bay, Haiti", "Mysore Palace, Mysore, India", "Diani Beach, Kenya", "Battle of Stalingrad Museum, Volgograd, Russia", "Cavendish Beach, Prince Edward Island, Canada", "Little Corn beaches, Nicaragua", "Marseille, France", "Fez, Morocco", "Southwestern Beach, Koh Rong, Cambodia", "Panama City Beach, Florida, United States", "Porto da Barra, Salvador, Brazil", "Chefchouen, Morocco", "Los Roques, Federal Dependencies, Venezuela", "Tanjung Rhu, Langkawi, Malaysia", "Trunk Bay, St. John, U.S. Virgin Islands", "Natadola Beach, Fiji", "Patnem Beach, Goa, India", "Bondi Beach, Sydney, Australia", "Nungwi, Zanzibar, Tanzania", "Negril Beach, Jamaica", "Dominical Beach, Costa Rica", "Canggu Beach, Bali, Indonesia", "Karekare, West Auckland, New Zealand", "West Bay Beach, Roatan, Honduras", "Nemocón Salt Mines, Cundinamarca, Colombia", "Bahia Solano, Chocó, Colombia", "Balos Beach, Greece", "Cayo Paraiso, Dominican Republic", "Margaret River, Australia", "Navagio Beach, Greece", "Maya Bay, Ko Phi Phi, Thailand", "Playa Paraiso, Cayo Largo, Cuba", "Independence National Historical Park, Philadelphia, USA", "Warwick Long Bay, Bermuda", "Sunrise Beach, Koh Lipe, Thailand", "Hanalei Bay, Hawaii, United States", "Bottom Bay, Barbados", "Meads Bay, Anguilla", "Long Bay, Saint-Martin", "Sun Island Beach, Maldives", "Egremni Beach, Greece", "Crane Beach, Barbados", "Boulders Beach, Cape Town", "Grand Anse, Grenada", "Juara Beach, Tioman Island, Malaysia", "Rarotonga, Cook Islands", "Nihiwatu Beach, Sumba, Indonesia", "Pigeon Point, Tobago, Trinidad and Tobago", "Luskentyre Beach, Scotland", "The Baths, Virgin Gorda, British Virgin Islands", "El Nido, Palawan, Philippines", "Pulau Perhentian Kecil, Malaysia", "Palaui Island, Cagayan Valley, Philippines", "Champagne Beach, Vanuatu", "Jaipur, Rajasthan, India", "Wilanów Palace, Warsaw, Poland", "Wineglass Bay, Tasmania", "Cabbage Beach, Paradise Island, Bahamas", "Anse de Grande Saline, St. Barths", "Anse Source d'Argent, La Digue, Seychelles", "Valparaiso, Chile", "Grace Bay, Providenciales, Turks and Caicos Islands", "Rabbit Beach, Lampedusa, Italy", "Grande Anse Beach, La Digue Island, Seychelles", "Cuernos Del Paine, Patagonia, Chile", "Mount Thor, Baffin Island, Nunavut, Canada", "Essaouira, Morocco", "Alpamayo, Cordillera Blanca, Peru", "Matterhorn, Switzerland, France and Italy", "Ama Dablam, Nepal", "Half Dome, California, USA", "Laila Peak, Gilgit-Baltistan, Pakistan", "Bacalar lagoon, Mexico", "Kazan Kremlin, Kazan, Republic of Tatarstan", "Mount Fuji, island of Honshū, Japan", "Mount Kilimanjaro, Tanzania, Africa", "Bagan, Myanmar", "Stetind, Narvik, Nordland, Norway", "Trango Towers, Gilgit-Baltistan, Pakistan", "Tsaranoro, Andringitra National Park, Madagascar", "Matira Beach, Bora Bora, Tahiti", "Fortaleza, Ceará, Brazil", "Uluru, Northern Territory, Australia", "Łazienki Palace, Warsaw, Poland", "Table Mountain, Cape Town, South Africa", "Lake District, Mountainous region in North West, England", "Batu Caves, Malaysia", "Sagano Bamboo Forest, Arashiyama, Kyoto, Japan", "Huacachina, Southwestern Peru", "Chapultepec Castle, Mexico City, Mexico", "Palenque, Chiapas, Mexico", "Sutherland Falls, Milford Sound, Zealand", "Laguna Verde, Potosí Department, Bolivia", "Tiger’s Nest Monastery, Upper Paro Valley, Bhutan", "Verdon Gorge, Provence-Alpes-Côte d'Azur, France", "Socotra Island, Socotra Archipelago, Yemen", "Saint Lucia, Caribbean Sea", "Keukenhof, Municipality of Lisse, Netherlands", "Faroe Islands, Atlantic, Kingdom of Denmark", "Guggenheim Museum, New York, USA", "Perito Moreno Glacier, Santa Cruz Province, Argentina", "Freudenberg Town, North Rhine-Westphalia, Germany", "Town of Luang Prabang, Laos", "Gardner Bay, Espanola Island, Ecuador", "Tasiilaq Town, Sermersooq Municipality, Greenland", "Neelum Valley, Pakistan", "Lofoten, Norway", "Great Blue Hole, Belize", "Tongariro National Park", "Aiguille Du Dru, Haute-Savoie, France", "Angkor Wat, Cambodia", "Petra, Mountain of Jabal Al-Madbah, Jordan", "Salar De Uyuni, Bolivia", "Galapagos Islands", "Jasper Creek, Bolívar, Venezuela", "The Nazca Lines", "Perito Moreno Glacier, El Calafate, Argentina", "Aitutaki, Cook Islands", "Halong Bay, Vietnam", "San Francisco, California", "Pyramids of Giza, Egypt", "Matsumoto Castle", "Laguna Colorada, Bolivia", "Patan, Nepal", "Niue Island, New Zealand", "Aoraki / Mount Cook", "Amber Fort, Rajasthan, India", "Antigua,  Antigua and Barbuda", "Puerto Princesa Underground River", "Sahara, Morocco", "Meteora Orthodox Monasteries, Greece", "Komodo Island, Indonesia", "Petronas Twin Towers, Kuala Lumpur, Malaysia", "Khajuraho, Madhya Pradesh, India", "Rock Islands of Palau", "Carthage, Tunisia", "Statue of Unity, Kevadiya, India", "Karnak Temple", "Historic City of Segovia and Aqueduct, Spain", "Mont St. Michel, France", "Eiger, Mountain in the Bernese Alps, Switzerland", "Wadi Rum Protected Area", "Belize Barrier Reef Reserve System, Belize City, Belize", "Blue Waterfall", "Lifou Island, New Caledonia, Loyalty Islands", "Huayna Picchu, Cusco, Peru", "White Island, Long Beach, California, USA", "Moorea, Tahiti", "Placencia Beach, Belize", "Yap Islands, Micronesia", "Easter Island, Chile", "South Pole, Antarctica", "Mount Rushmore, South Dakota, USA", "Griffith Park, Los Angeles, California, USA", "Hollywood sign, Los Angeles, California, USA", "Matera, Italy", "Perugia, Italy", "Annecy, Haute-Savoie, France", "Burj Al Arab, Dubai", "Marina Bay, Singapore", "Ifaty Beach, Madagascar", "Amlaj, Tabuk, Saudi Arabia ", "Al-Ala, Medinah, Saudi Arabia ", "The Lost Paradise Of Dilmun, Bahrain ", "Al-Murabba Palace, Riyadh, Saudi Arabia", "Greenwich meridian, London, UK", "Vietnam Veterans Memorial, Washington, D.C., USA", "Boracay, Aklan, Philippines", "Puerto Princesa, Palawan, Philippines", "Waikiki Beach, Hawaii", "Serengeti National Park, Tanzania", "Ngorongoro Crater, Tanzania", "Stone Town, Zanzibar ", "Atacama desert, Chile ", "Gheralta, Ethiopia", "Addis Abeba, Ethiopia ", "Bwindi Impenetrable forest National Park, Uganda", "Vilankulos, Mozambique ", "Blyde river Canyon South Africa ", "Coffee bay, South Africa ", "Fish river Canyon, Namibia ", "Dedvleil, Namibia ", "Bazaruto Island, Mozambique ", "Isla Magdalena, Ushuaia", "Hue, Vietnam", "Bartolome island, Galapagos Island", "Jeddah Corniche, Makkah, Saudi Arabia ", "Genovesa Island,, Galapagos Island ", "San Blas islands, Panama ", "Salary Bay, Madagascar", "Salta, Argentina", "Kuang Si Falls, Laos", "Granada, Nicaragua", "Antigua, Guatemala ", "Tikal , Guatemala ", "White Sand National Park, New Mexico", "Seven Mile beach, Negril, Jamaica ", "Victoria falls, Zambia", "New Orleans, Alabama", "Corn Islands, Nicaragua ", "Mahahual, Mexico", "Mostar, Bosnia Erzegovina ", "Merzouga, Morocco", "Espanola Island, Galapagos Islands", "Bocas del Toro, Panama", "Danakil Depression, Ethiopia", "Omo Valley, Ethiopia", "Opuwo, Namibia", "Al-Masmak Fortress, Riyadh, Saudi Arabia ", "Sarajevo, Bosnia Erzegovina", "Pulau Derawan, Indonesia", "Okavango Delta, Botswana", "Tsingy de Bemaraha National Park, Madagascar", "Burj Khalifa, Dubai", "Pemba Island, Tanzania", "Denali National Park and Preserve, Alaska, USA", "Fitz Roy, Cerro Chaltén, Patagonian, Chile / Argentina", "Huangshan, Anhui Province, China", "Mount Roraima -Tepuy Roraima-, Bolívar, Venezuela", "Potosì, Bolivia", "Al-Aqsa Mosque , Jerusalem, Palestina and Israel ", "Mafia Island, Tanzania", "Kibale Forest National Park, Uganda", "Linosa, Italy", "World War II Memorial, Washington, D.C., USA", "Titicaca lake, Bolivia", "Quito, Ecuador", "Palace of Versailles, Versailles, The future of France", "Bitcoin beach (Playa El Zonte), El Salvador", "Bitcoin Valley, Rovereto, Garda Lake, Italy", "Main Hub, The Sandbox, Metaverse", "The Street, Metaverse", "The Street, Downtown, Metaverse", "The Black Sun, Downtown, Metaverse", "Zion, the last human city", "Construct, the Matrix", "Downtown, Mega City, the Matrix", "Oasis, Metaverse", "Kolomna, Moscow Oblast, Russia", "Waterloo, Ontario, Canada", "Long Beach, California, USA", "Twitter, Metaverse", "Discord, Metaverse", "Etherscan, Metaverse", "0x000000000000000000000000000000000000dead", "0x0000000000000000000000000000000000000000", "127.0.0.1", "::1", "https://tripscommunity.com", "tripscommunity.eth", "42.452483,-6.051345", "34.132700,-118.283800"];

    //sorted
    string[] private character = ["Energetic", "Good-natured", "Enthusiastic", "Challenging", "Charismatic", "Wise", "Modest", "Honest", "Protective", "Perceptive", "Providential", "Prudent", "Spontaneous", "Insightful", "Intelligent", "Intuitive", "Precise", "Sharing", "Simple", "Sociable", "Sophisticated", "Benevolent", "Admirable", "Brilliant", "Accessible", "Calm", "Capable", "Optimistic", "Respectful", "Responsible", "Responsive", "Invulnerable", "Kind", "Lovable", "Loyal", "Practical", "Patient", "Patriot", "Reliable", "Secure", "Selfless", "Uncomplaining", "Understanding", "Resourceful", "Curious", "Daring", "Decisive", "Dedicated", "Disciplined", "Discreet", "Active", "Adaptable", "Adventurous", "Alert", "Appreciative", "Aspiring", "Dutiful", "Captivating", "Caring", "Efficient", "Elegant", "Eloquent", "Empathetic", "Earnest", "Educated", "Courteous", "Athletic", "Agreeable", "Balanced", "Creative", "Orderly", "Romantic", "Hardworking", "Scrupulous", "Considerate", "Contemplative", "Organized", "Original", "Passionate", "Relaxed", "Principled", "Profound", "Reflective", "Sensitive", "Sentimental", "Serious", "Cultured", "Forgiving", "Forthright", "Freethinking", "Friendly", "Fun-loving", "Generous", "Gentle", "Genuine", "Cheerful", "Clever", "Compassionate", "Conciliatory", "Confident", "Conscientio", "Honorable", "Humble", "Humorous", "Idealistic", "Fair", "Sporting", "Strong", "Subtle", "Sweet", "Sympathetic", "Systematic", "Tasteful", "Thorough", "Tidy", "Dramatic", "Tolerant", "Tractable", "Trusting", "Firm", "Flexible", "Focused", "Cooperative", "Courageous", "Imaginative", "Independent", "Innovative", "Observant", "Playful", "Gracious", "Vivacious", "Warm", "Well-read", "Self-reliant", "Charming", "Dynamic", "Helpful", "Peaceful", "Perfectionist", "Persuasive", "Popular", "Articulate", "Magnanimous", "Mature", "Methodical", "Moderate", "Objective", "Rational", "Realistic", "Witty"/*,"Youthful"*/];

    //sorted
    string[] private transport = ["Train", "Car", "Bus", "Airplane", "Cruise", "4 wheel drive car", "Bus", "Airplane", "Convertible car", "Bicycle", "Motorbike", "Electric Bicycle", "Campervan", "Trailer", "Sailboat", "Electric car", "Scooter", "Bullet train", "Local train", "Cinquecento", "Hitch-hiking", "VW Beetle", "Station wagon", "VW Bus", "Truck", "Off-road Vehicle", "Cab", "Motorboat", "Hot Air Balloon", "Cruise Ship", "Mountain bike", "Sports car", "Yacht", "RickShaw", "Horse carriage", "Biplane", "Orient Express", "Cargo ship", "Vespa", "Four-wheel drive", "Canoe", "Tractor", "Ferry", "Helicopter", "Jeep", "Low-rider", "Monocycle", "Limousine", "Maglev", "Submarine", "Lambo", "Ferrari", "Rocket", "DeLorean", "Kia Sedona", "Magic carpet", "Broomstick"];

    //sorted
    string[] private language = ["English", "Mandarin Chinese", "Hindi", "Spanish", "Arabic", "Bengali", "French", "Russian", "Portuguese", "Urdu", "Indonesian", "German", "Japanese", "Marathi", "Telugu", "Turkish", "Tamil", "Yue Chinese", "Wu Chinese", "Korean", "Vietnamese", "Hausa", "Iranian Persian", "Swahili", "Javanese", "Italian", "Western Punjabi", "Gujarati", "Thai", "Kannada", "Amharic", "Bhojpuri", "Eastern Punjabi", "Min Nan Chinese", "Nigerian Pidgin", "Jin Chinese", "Filipino", "Hakka Chinese", "Yoruba", "Burmese", "Sudanese Spoken Arabic", "Polish", "Odia", "Cambodian", "Croatian", "Danish", "Serbian", "Slovenian", "Estonian", "Latvian", "Lithuanian", "Finnish", "Czech", "Slovakian", "Greek", "Hungarian", "Swiss", "Icelandic", "Iraqi", "Irish", "Lao", "Lebanese", "Malagasy", "Berber", "Mongolian", "Montenegrin", "Burmese", "Nepalese", "Dutch", "Norwegian", "Rumenian", "Sinhala", "Tamil", "Uzbek", "Martian"];

    //already sorted
    string[] private experience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"];
    //IL NUMERO DEGLI ELEMENTI DEVE ESSERE UN MULTIPLO DI 3
    //not yet sorted
    string[] private occupation = [
        "Traveller",
        "Host",
        "SmartWorker",
        "Service Provider",
        "Digital Nomad",
        "Freelancer",
        "Unemployed",
        "Crypto Trader",
        "Play 2 Earner",
        "DeFi Airdrop Hunter",
        "DAO Community Manager",
        "DAO Member",
        "NFT flipper",
        "TripsCommunity Member",
        "NFT collector"
    ];

    //already sorted
    string[] private accomodation = [
       "Hotel",
        "Apartment",
        "Hostel",
        "Tent",
        "Bed and Breakfast",
        "Guest house",
        "Chalet",
        "Cottage",
        "Boat",
        "Caravan",
        "Motorhome",
        "5 stars Hotel",
        "Suite in 5 Stars Hotel",
        "Tipi",
        "Tree House",
        "Bungalow",
        "Ranch",
        "Co-living",
        "Gablefront cottage",
        "Longhouse",
        "Villa",
        "Yurt",
        "Housebarn",
        "Adobe House",
        "Castle",
        "Rammed earth",
        "Sod house",
        "Underground living",
        "Wattle and daub",
        "Log house",
        "I-house",
        //"Stilt house",
        //"Venetian palace",
        "Igloo",
        "Trullo"
    ];

    //IL NUMERO DEGLI ELEMENTI DEVE ESSERE UN MULTIPLO DI 3
    //not yet sorted
    string[] private bag = [
        "Pen",
        "Swiss knife",
        "Mobile phone",
        "Notebook ",
        "Digital Camera",
        "Knife",
         "Pen",
        "Swiss knife",
        "Mobile phone",
        "Notebook ",
        "Digital Camera",
        "Knife",
         "Pen",
        "Swiss knife",
        "Mobile phone",
        "Notebook ",
        "Digital Camera",
        "Knife"
    ];

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function extractOutput(string[] memory sourceArray, uint8 toHoundred, string memory keyPrefix) internal view returns (string memory){
        uint8 delta = toHoundred > 95 ? 1 : toHoundred > 80 ? 2 : 3;
        uint8 len = uint8(sourceArray.length);
        uint8 x = len / 3;
        uint8 min = len - (delta* x);
        uint8 max = (len -1) - ((delta -1) * x);
        //estraggo un numero a caso incluso tra min e max
        uint8 rand = uint8((random(string(abi.encodePacked(/*block.difficulty,*/ msg.sender, toHoundred, keyPrefix /*,block.timestamp*/))) % (max - min + 1)) + min);
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

    function addressURI(address eliteAddress) external view returns (string memory){
        return tokenURI(uint160(eliteAddress));
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        LootDetails memory det = detailsByAddress[teamList[tokenId]];
        string memory bColor = det.bColor;
        string memory fColor = det.fColor;
        string[3] memory parts;

        parts[0] = string(abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill:', fColor,'; font-family: serif; font-size: 14px; }</style> <rect width="100%" height="100%" fill="',bColor,'" /><text x="10" y="20" class="base">'));
        parts[1] = string(abi.encodePacked(getEnvironment(tokenId),'</text><text x="10" y="40" class="base">',getTalent(tokenId),'</text><text x="10" y="60" class="base">',getPlace(tokenId),'</text><text x="10" y="80" class="base">',getCharacter(tokenId),'</text><text x="10" y="100" class="base">',getTransport(tokenId),'</text><text x="10" y="120" class="base">',getLanguage(tokenId)));
        parts[2] = string(abi.encodePacked('</text><text x="10" y="140" class="base">',getExperience(tokenId),'</text><text x="10" y="160" class="base">',getOccupation(tokenId),'</text><text x="10" y="180" class="base">',getAccomodation(tokenId),'</text><text x="10" y="200" class="base">',getBag(tokenId),'</text></svg>'));

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2]));


        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Traveler Loot #', toString(tokenId), '", "description": "Traveler Loot is randomized character generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use the Traveler Loot in any way you want.", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

    function counter(address addr) public view returns (uint16){
        require(detailsByAddress[addr].verified, "This address is not verified. Try another one");
        return detailsByAddress[addr].counter;
    }

    function claim(uint256 tokenId) public nonReentrant {
        if (owner() == _msgSender()){
            require(tokenId > MAX_FOR_LOOTERS && tokenId <= MAX_FOR_LOOTERS + MAX_FOR_OWNER, "Token ID invalid");
        }
        else{
            require(tokenId > MAX_FOR_LOOTERS + MAX_FOR_OWNER && tokenId <= MAX_ID, "Token ID invalid");
        }
        detailsByAddress[address(0)].counter++;
        teamList[tokenId] = address(0);
        _safeMint(_msgSender(), tokenId);
    }

    function claimQualified(uint256 tokenId, address contractAddress) public nonReentrant {
        require(detailsByAddress[contractAddress].verified, "This address is not supported. Try another one or use claim() function");
        IERC721 looter = IERC721(contractAddress);
        require(tokenId > 0 && looter.ownerOf(tokenId) == msg.sender, "You are not the tokenId owner of the input address");
        uint16 discreetTId = uint16((tokenId % MAX_FOR_LOOTERS)+1);
        detailsByAddress[contractAddress].counter++;
        teamList[discreetTId] = contractAddress;
        _safeMint(_msgSender(), discreetTId);
    }

    function claimForElites() public payable nonReentrant {
        require(msg.value >= price, "You need to send the correct price to call this function. Only for Elites. If you are a Looter, you can");
        uint160 castedAddress = uint160(_msgSender());
        require(castedAddress > MAX_ID, "Try with another address. This one cant be used");
        detailsByAddress[address(1)].counter++;
        teamList[castedAddress] = address(1);
        _safeMint(_msgSender(), castedAddress);
    }


    function claimForLootElites(uint256 lootId) public nonReentrant {
        require(lootId > 0 && lootId <= 8000, "Token ID invalid");
        IERC721 looter = IERC721(lootAddress);
        require(looter.ownerOf(lootId) == _msgSender(), "Not the owner of this loot");
        uint160 castedAddress = uint160(_msgSender());
        require(castedAddress > MAX_ID, "Try with another address. This one cant be used");
        require(block.timestamp <= 1790546399, "Sorry this offer was only valid till Dom's 40th bday"); //  Sunday 27 September 2026 21:59:59

        detailsByAddress[address(2)].counter++;
        teamList[castedAddress] = address(2);
        _safeMint(_msgSender(),castedAddress);
    }

    function increasePrice() public onlyOwner{
        require(block.timestamp <= 1790546399, "Sorry, price can't be increased anymore after Dom's 40th bday"); //  Sunday 27 September 2026 21:59:59
        price += price/10;
    }
    function withdraw() public onlyOwner {
        payable(treasurer).transfer(address(this).balance);
    }

    function setTreasurer(address newAddress) public onlyOwner{
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
